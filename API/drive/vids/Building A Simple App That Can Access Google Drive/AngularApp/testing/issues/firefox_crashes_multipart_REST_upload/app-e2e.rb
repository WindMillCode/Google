require %{capybara}
require %{capybara/dsl}
require %{capybara/rspec}
require %{capybara/rspec/matcher_proxies}
require %{rspec/expectations}
require %{rails_helper}
require %{percy}
require %{selenium/webdriver}
require %{selenium-webdriver}
require %{net/http}
require %{rest-client}
require %{json}
require %{pp}
require %{uri}


class Capybara::Selenium::Driver < Capybara::Driver::Base
	def reset!
		if @browser
			@browser.navigate.to('about:blank')
		end
	end
end


# dev setup

Selenium::WebDriver.logger.level = :debug
Selenium::WebDriver.logger.output = 'selenium.log'
Capybara.raise_server_errors = true
Capybara.run_server = false
module TestMod

	# attr_accessor :current_driver,:envs
	CURRENT_DRIVER = nil
	ENVS = {
		%{Rental} =>{
			:primary_subsheet =>%{Primary rental application data},
			:website =>nil
		},
		%{Homeowner} =>{
			:primary_subsheet =>%{Primary Housing Application Data},
			:website =>nil
		},
		:angular_env =>nil,
		:website => nil,
	}
	def TestMod.reset_drive_workspace devObj

		access_token = %{Bearer } << ((( devObj[:execute_script].call %Q{
			return capybara_env.seeef()
		}).fetch %{creds}).fetch %{access_token})

		# A reset the drive workspace aka mimic an accident



		# C Grab all files even using nextPageToken
		reset = TestMod.reset_hash
		my_arg = {
			:reset => reset,
			:access_token => access_token
		}
		reset = TestMod.get_all_files my_arg
		# C

		# PP.pp (reset[:files])

		# B also removing files to enable the reset
			# when dealing with the non gndc acct, uncommement Homeowner and Rental when statements
		reset[:files].reject!.with_index do |x,i|
			resource = {
				:file => x,
				:access_token => access_token,
				:reject => false
			}
			case x.fetch %{name}
				when %{Backup_Homeowner}
					unless reset[:count][:homeowner] == 0
						TestMod.delete_file resource
						resource[:reject] = true
					end
					reset[:count][:homeowner] += 1
				when %{Backup_Rental}

					unless reset[:count][:rental] == 0
						TestMod.delete_file resource
						resource[:reject] = true

					end
					reset[:count][:rental] += 1

				# when "Homeowner"
				# when "Rental"
				else
				TestMod.delete_file resource
				resource[:reject] = true
			end
			resource[:reject]
		end
		p reset[:count]
		# B

		# D making sure appProprties are on the resources in the reset workspace
		reset[:files].each  do |x|
			ans = RestClient::Request.execute(
				:method =>:patch,
				:url => %{https://www.googleapis.com/drive/v3/files/#{x.fetch %{id}}},
				:timeout => 10,
				:payload => {
					:appProperties => {'needed' => 'true'},
				}.to_json,
				:headers =>{
					:params => {
						:fields =>   %{properties,appProperties,name},
					},
					:Authorization => access_token,
					"Content-Type" => "application/json"
				}
			)
			# PP.pp (JSON.parse ans)
		end
		# D

		# A
	end

	def TestMod.get_subsheet_values devObj

		reset = devObj.fetch :reset,%{Throw err}
		reset[:get_all_response] = RestClient::Request.execute(
			:method =>:get,
			:url => (URI::encode %{https://sheets.googleapis.com/v4/spreadsheets/#{devObj[:file].fetch %{id}}/values/'#{devObj[:subsheet]}'!#{devObj[:range]}}),
			:timeout => 20,
			:headers =>{
				:Authorization => devObj[:access_token],
			}
		)

		# sheets api wraps rows in their own array
		JSON.parse reset[:get_all_response]

	end

	def TestMod.testing_instance
		{
			:current_driver => nil,
			:submit_button => nil,
			:submit_loader => nil,
			:app_id => nil,
			:rental_spreadsheet_id => nil,
			:homeowner_spreadsheet_id => nil,
			:all_id => nil
		}
	end

	def TestMod.reset_hash
		{
			:get_all_response => nil,
			:files => [],
			:nextPageToken => %{},
			:count =>{
				:homeowner => 0,
				:rental => 0,
			},
			:subsheets => Hash.new
		}
	end

	def TestMod.delete_file devObj

		# we dont care too much about child files if the parent goes missing
		# please try to delete them thnx
		begin
			RestClient::Request.execute(
				:method =>:delete,
				:url => %{https://www.googleapis.com/drive/v3/files/#{devObj[:file].fetch %{id}}},
				:timeout => 10,
				:headers =>{
					:Authorization => devObj[:access_token],
				}
			)
		rescue

		end
	end

	def TestMod.get_all_files devObj
		reset = devObj[:reset]
		access_token = devObj[:access_token]
		params = {
			:fields =>   %{files/id,files/name,nextPageToken},
			:pageSize => 1000,
			:orderBy =>  "folder",
			:pageToken => reset[:nextPageToken]
		}
		unless devObj.fetch( :params,nil) == nil
			params[:q] = devObj[:params][:q]
		end
		until reset[:nextPageToken] == %{Reached The End}
			reset[:get_all_response] = RestClient::Request.execute(
				:method =>:get,
				:url => %{https://www.googleapis.com/drive/v3/files},
				:timeout => 10,
				:headers =>{
					:params => params,
					:Authorization => access_token
				}
			)
			reset[:nextPageToken] = (JSON.parse reset[:get_all_response]).fetch %{nextPageToken},%{Reached The End}
      reset[:files].concat (JSON.parse reset[:get_all_response]).fetch %{files}
		end
		reset[:nextPageToken] = %{}
		reset
	end

	def TestMod.check_spreadsheet_id devObj

		# A var setup
		access_token = %{Bearer } << ((( devObj[:execute_script].call %Q{
			return capybara_env.seeef()
		}).fetch %{creds}).fetch %{access_token})
		reset = TestMod.reset_hash
		my_arg = {
			:reset => reset,
			:access_token => access_token,
			:params => {
				:q => %{name = '#{(devObj[:angular_env][%{testingAcct}][%{capybara}][%{url}])}'}
				# :q => %{name = 'Rental'}
			},

		}
		# A

		# B Grab all files even using nextPageToken
		reset = TestMod.get_all_files my_arg
		# B


		# C Grabbing the spreadsheet data
		# PP.pp reset[:files]
		my_arg = {
			:reset => reset,
			:access_token => access_token,
			:range => %{B:B},
			:file => reset[:files][0],
			:subsheet =>TestMod::ENVS[TestMod::ENVS[:angular_env][%{testingAcct}][%{capybara}][%{url}]][:primary_subsheet]
		}
		((TestMod.get_subsheet_values my_arg).fetch %{values}).collect! do |x|
			x[0]
		end
		# C

	end

end

$my_test = nil
$envs = nil
$access_token = nil
$angular_env = nil


RSpec.configure do |config|

  my_drivers = %i{selenium} # this is the geckodriver, dont check trust me
	hosts = Hash.new
	hosts[:rental_dev] =  %{http://localhost:4200}

	config.before(:example) do
			visit %{/}

			# A var setup
			$envs = execute_script %Q{
				return {
					angular_env:capybara_env.env,
					website:capybara_env.website
				}
			}
			TestMod::ENVS[:angular_env] = $envs.fetch %{angular_env}
			TestMod::ENVS[:website] = $envs.fetch %{website}
			$access_token = %{Bearer } << ((( execute_script %Q{
				return capybara_env.seeef()
			}).fetch %{creds}).fetch %{access_token})
			$reset = TestMod.reset_hash
			# A

	end

	config.around do |example|
		PP.pp example.metadata
		my_drivers.each do |browser|
			hosts.each do |k,v|
				$my_test = TestMod.testing_instance
				Capybara.current_driver = browser
				Capybara.app_host = v
        p Capybara.app_host.to_s +  %{  in } + Capybara.current_driver.to_s
				example.run
			end
		end
	end

end

def startTest
	@javascript

	RSpec.feature %{corrpution} do
		scenario %{corrupted_files} do

			envs = $envs
			access_token = $access_token
			reset = $reset

			# A fill out the form
			execute_script %Q{
				capybara_env.fakeValues()
			}
			Capybara.ignore_hidden_elements = false
			# A

			# B reset the drive workspace
				# this mean I send REST API calls to delete some files in the target google drive
			my_arg = {
				:execute_script => method(:execute_script),
				:angular_env => TestMod::ENVS[:angular_env]
			}
			TestMod.reset_drive_workspace my_arg
      # B

			# C upload files
			file_input = first %{input[type="file"]}
      sample_files = Dir[%{C:/Users/oluod/My_Notebook/angular/v10/GNDC/misc/various_files/*}].select do
        rand(0..1) == 1? true:false
      end
      .collect do |x|
        x.gsub %{/},%{\\}
      end
			begin
				file_input.attach_file sample_files,:make_visible => true
			rescue => exception
				# edge legacy will upload sample_files.length files other browser might just upload one check
				sample_files.each do |x|
					file_input.attach_file x,:make_visible => true
				end
			end
      # C

			# D make sure form is submitted successfully
				# The browser doesnt crash when files are uloaded to the browser it crashes, most likely
				# when it tries to upload the files to google drive
      $my_test[:submit_button] = first %{#GNDC_Rental_Housing_Submit}
			$my_test[:submit_button].select_option
			sleep 3
			$my_test[:submit_loader] = first %{.d_i_a_l_o_g_LoadingIcon}
			expect($my_test[:submit_loader].tag_name).to match  %{mat-progress-spinner}
			sleep 20
			$my_test[:app_id] = first %{.d_i_a_l_o_g_applicantID}
			expect($my_test[:app_id]).not_to be_nil
			# expect the appID end user got to be found in the column of appID from the gsheet
			$my_test[:all_id] = TestMod.check_spreadsheet_id my_arg
			expect($my_test[:all_id].count $my_test[:app_id].text).to be > 0
      # D


		end
	end

end

startTest
