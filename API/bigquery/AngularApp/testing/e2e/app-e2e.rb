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


# class Capybara::Selenium::Driver < Capybara::Driver::Base
# 	def reset!
# 		if @browser
# 			@browser.navigate.to('about:blank')
# 		end
# 	end
# end



# dev setup

# class Capybara::Node::Element
# 	def select_option(wait: nil)
# 		begin
# 			synchronize(wait) { base.select_option }
# 			self
# 		rescue => exception
# 			scroll_to self
# 			synchronize(wait) { base.click }
# 			self
# 		end
# 	end
# end
Selenium::WebDriver.logger.level = :debug
Selenium::WebDriver.logger.output = %{selenium.log}
# Selenium::WebDriver.logger.output = 'C:\Users\oluod\My_Notebook\angular\v10\GNDC\CLT-GNDC\testing\issues\geckodriver_vv_option\default_profile_84_reset_vv_option.log'
Capybara.raise_server_errors = false
Capybara.run_server = false
Capybara.default_max_wait_time = 5
Capybara.ignore_hidden_elements = false
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
	def TestMod.case_substring devObj
		Proc.new do |string|
			# p string
			# p devObj[:sub]
			string.include? devObj[:sub]
		end
	end
	def TestMod.reset_drive_workspace devObj

		access_token = %{Bearer } << ((( devObj[:execute_script].call %Q{
			return capybara_env.seeef()
		}).fetch %{creds}).fetch %{access_token})

		# A reset the drive workspace aka mimic an accident



		# C Grab all files even using nextPageToken
		reset = TestMod.reset_hash
		my_arg = {
			:reset => reset,
			:access_token => access_token,
			:params =>{
				:q => %{appProperties has { key='needed' and value='true' }} << (devObj[:testingAcct] == %{true} ? %{ and trashed != true} : %{})
			}
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
						devObj[:testingAcct] == %{true} ? (TestMod.trash_file resource) : (TestMod.delete_file resource)
						resource[:reject] = true
					end
					reset[:count][:homeowner] += 1
				when %{Backup_Rental}

					unless reset[:count][:rental] == 0
						devObj[:testingAcct] == %{true} ? (TestMod.trash_file resource) : (TestMod.delete_file resource)
						resource[:reject] = true

					end
					reset[:count][:rental] += 1

				when "Homeowner"
					TestMod.delete_file resource unless devObj[:testingAcct] == %{true}
					resource[:reject] = true unless devObj[:testingAcct] == %{true}
				when "Rental"
					TestMod.delete_file resource unless devObj[:testingAcct] == %{true}
					resource[:reject] = true unless devObj[:testingAcct] == %{true}
				else
					devObj[:testingAcct] == %{true} ? (TestMod.trash_file resource) : (TestMod.delete_file resource)
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
			:invalid_button => nil,
			:invalid_input => nil,
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

	def TestMod.trash_file devObj

		# we dont care too much about child files if the parent goes missing
		# please try to delete them thnx
		begin
			RestClient::Request.execute(
				:method =>:patch,
				:url => %{https://www.googleapis.com/drive/v3/files/#{devObj[:file].fetch %{id}}},
				:timeout => 10,
				:payload => {
					:appProperties => {'trashed' => true},
				}.to_json,
				:headers =>{
					:Authorization => devObj[:access_token],
					"Content-Type" => "application/json"
				}
			)
		rescue

		end
	end

	def TestMod.get_all_files devObj
		reset = devObj[:reset]
		access_token = devObj[:access_token]
		params = {
			:fields =>   %{files/id,files/name,nextPageToken,files/properties,files/appProperties},
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
$example = nil
$sample_files = Dir["C:/Users/oluod/My_Notebook/angular/reserve/various_files/*"]


Capybara.register_driver :internetExplorer do |app|


	Capybara::Selenium::Driver.new(
		app,
		:browser => :internet_explorer,
		:options =>   Selenium::WebDriver::IE::Options.new({
			:ignore_zoom_levels => true,
			:ignore_zoom_setting => true,
			# :browser_attach_timeout => 1,
			:javascript_enabled => true,
			:persistent_hover => true,
			# :require_window_focus => true,
			:ignore_protected_mode_settings =>true,
			:ignore_zoom_level => false
		})
	)

end

Capybara.register_driver :firefox_profile do |app|
	desired_caps = Selenium::WebDriver::Remote::Capabilities.firefox
	# desired_caps[:firefox_profile] = %{file:///C:/Users/oluod/My_Notebook/angular/v10/GNDC/CLT-GNDC/testing/e2e/firefox_profile}
	# desired_caps[:firefox_profile] = %{C:/Users/oluod/My_Notebook/angular/v10/GNDC/CLT-GNDC/testing/e2e/firefox_profile}
	# desired_caps[:firefox_profile] = %{capybara}
	service = Selenium::WebDriver::Service.firefox :args => [%{-vv}]
	options = Selenium::WebDriver::Firefox::Options.new :args => [%{-profile=C:\\Users\\oluod\\My_Notebook\\angular\\v10\\GNDC\\CLT-GNDC\\testing\\e2e\\firefox_profile}]
  # options.profile = Selenium::WebDriver::Firefox::Profile.new %{C:\\Users\\oluod\\My_Notebook\\angular\\v10\\GNDC\\CLT-GNDC\\testing\\e2e\\firefox_profile}

  options.log_level = %{trace}
	Capybara::Selenium::Driver.new(
		app,
    :browser => :ff,
    :desired_capabilities => desired_caps,
		:options =>   options,
		:service => service
	)

end

Capybara.register_driver :edgeBrowser do |app|


	Capybara::Selenium::Driver.new(
		app,
		:browser => :edge,
		:desired_capabilities =>Selenium::WebDriver::Remote::Capabilities::edge({
			:javascript_enabled => true,
			:css_selectors_enabled => true,
		}),
	)

end

Capybara.register_driver :operaDriver do |app|

	Capybara::Selenium::Driver.new(
		app,
		:browser => :opera,
		:desired_capabilities =>Selenium::WebDriver::Remote::Capabilities::edge({
			:javascript_enabled => true,
			:css_selectors_enabled => true,
		}),
	)


end

RSpec.configure do |config|


	my_drivers = %i{ edgeBrowser internetExplorer selenium }
	# my_drivers = %i{ edgeBrowser }
  # my_drivers = %i{ firefox_profile }
  # my_drivers = %i{ selenium}
	# my_drivers = %i{ internetExplorer }
	hosts = Hash.new
	hosts[:rental_dev] =  %{http://localhost:4200}
	# hosts[:homeowner_dev] =  %{http://localhost:4201}
  # hosts[:rental_prod] = %{https://www.guadalupendc.org/online-rental-housing-application}

	config.full_backtrace = false
	config.backtrace_exclusion_patterns = [
    /\/lib\d*\/ruby\//,
    /bin\//,
    /gems/,
    /spec\/spec_helper\.rb/,
    /lib\/rspec\/(core|expectations|matchers|mocks)/
  ]

	config.before :example do
		page.driver.quit
		begin
			page.driver.close_window page.windows.last.handle
		rescue => exception

		end
		page.current_window.maximize
		visit %{/}
		# A var setup
		$envs = execute_script %Q{
			window.focus()
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


	config.after :example do
		# page.driver.quit
		# begin
		# 	page.driver.close_window page.windows.last.handle
		# rescue => exception

		# end
	end

	config.around do |example|
		$example  = example
		my_drivers.each do |browser|
			hosts.each do |k,v|
				$my_test = TestMod.testing_instance
				Capybara.current_driver = browser
				Capybara.app_host = v
				$my_test[:current_driver] = browser

				# unless example.metadata[:description].include? %{file} and browser == :selenium
					# A Identifying and running each scenario
					p Capybara.app_host.to_s +  %{ in } + Capybara.current_driver.to_s
					p %{scenario #{example.metadata[:description]}}
					begin
						example.run
					rescue => exception
						page.driver.quit
					end

					# A
				# end
			end
		end
	end
	config.after :suite do
		system %{taskkill /IM MicrosoftEdge.exe -F}
		system %{taskkill /IM MicrosoftWebDrivers.exe}
	end
end


def startTest
	@javascript

	RSpec.feature %{navigation stuff}   do
		scenario %{I can get to homepage} do
			visit %{/}
		end
	end

	RSpec.feature %{visual regression}    do
		scenario %{dev view} do

			widths = %w{300  560  770  1020  1210}.collect &:to_i
			unless $my_test[:current_driver] == :edgeBrowser
				widths.each_with_index do |width,i|
					# page.fullscreen
					page.current_window.resize_to width, 800
					sleep 3
				end
			else
				widths.each_with_index do |width,i|
					execute_script %Q{
						resizeTo(#{width},800)
					}
					sleep 3
				end
			end
		end
	end

	RSpec.feature %{corrpution}, :skip => true do
		scenario %{corrupted} do

			angular_env = TestMod::ENVS[:angular_env]
      envs = $envs

			# A fill out the form
			execute_script %Q{
				capybara_env.env.submission.invalidate.any = false
				capybara_env.fakeValues()
			}
			Capybara.ignore_hidden_elements = false
			# A

      # B reset the drive workspace
			my_arg = {
				:execute_script => method(:execute_script),
				:angular_env => TestMod::ENVS[:angular_env],
				:testingAcct => $envs[%{angular_env}][%{testingAcct}][%{confirm}]
			}
      TestMod.reset_drive_workspace my_arg
      # B

      # C submit the form sucessfully
			Capybara.ignore_hidden_elements = false
      $my_test[:submit_button] = first %{#GNDC_Rental_Housing_Submit}
			$my_test[:submit_button].select_option
			$my_test[:submit_loader] = first %{.d_i_a_l_o_g_LoadingIcon}
			expect($my_test[:submit_loader].tag_name).to match  %{mat-progress-spinner}
			$my_test[:app_id] = first %{.d_i_a_l_o_g_applicantID}, :wait => 120
			expect($my_test[:app_id]).not_to be_nil
			$my_test[:all_id] = TestMod.check_spreadsheet_id my_arg
			expect($my_test[:all_id].count $my_test[:app_id].text).to be > 0
      # C

    end

		scenario %{corrupted_files}  do

			envs = $envs
			access_token = $access_token
			reset = $reset

			# A fill out the form
			execute_script %Q{
				capybara_env.env.submission.invalidate.any = false
				capybara_env.fakeValues()
			}
			Capybara.ignore_hidden_elements = false
			# A

			# B reset the drive workspace
			my_arg = {
				:execute_script => method(:execute_script),
				:angular_env => TestMod::ENVS[:angular_env],
				:testingAcct => $envs[%{angular_env}][%{testingAcct}][%{confirm}]
			}
			TestMod.reset_drive_workspace my_arg
      # B

			# C upload files
			file_input = first %{input[type="file"]}
      sample_files = $sample_files.select do
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
      $my_test[:submit_button] = first %{#GNDC_Rental_Housing_Submit}
			$my_test[:submit_button].select_option
			$my_test[:submit_loader] = first %{.d_i_a_l_o_g_LoadingIcon}
			expect($my_test[:submit_loader].tag_name).to match  %{mat-progress-spinner}
			$my_test[:app_id] = (first %{.d_i_a_l_o_g_applicantID}, :wait => 120).text
			expect($my_test[:app_id]).not_to be_nil
      # D


		end
	end

	RSpec.feature %{compare user values and spreadsheet}  do
		# TODO, dont compare against the elemets compare against the values before they are uploaded
		# Try to intercept the rest calls
		scenario %{compare_form_values} do


			# A var setup
			envs = execute_script %Q{
				capybara_env.env.submission.invalidate.any = false
				return {
					angular_env:capybara_env.env,
					website:capybara_env.website
				}
			}
			TestMod::ENVS[:angular_env] = envs.fetch %{angular_env}
			TestMod::ENVS[:website] = envs.fetch %{website}
			access_token = %{Bearer } << ((( execute_script %Q{
				return capybara_env.seeef()
			}).fetch %{creds}).fetch %{access_token})
			reset = TestMod.reset_hash
			# A

			# D fill out the form and grab values along the way
			Capybara.ignore_hidden_elements = false

			# for the multiples pressing the add & button random times
			15.times do
				([
					((all %{.f_o_r_m_Add}).flat_map do |x| Array.new 3,x end),
					((all %{.f_o_r_m_Remove}).flat_map do |x| Array.new 2,x end)
				].flatten.sample).select_option
			end
			#

			execute_script %Q{
				capybara_env.fakeValues()
			}
			TestMod::ENVS[:website][%{convertCMS}].each.with_index do |x,i|
				unless x[%{type_slug}] != %{forms}
					selector = %{.} << (x[%{type_slug}].delete_suffix %{s}) << %{CO#{i} }
					x[%{metafields}].collect! do |y|
						if %w{input date zipcode phone textbox }.include? y[%{type}]
							y.store %{selector},(selector + %{.} + y[%{key}]);
							y.store %{user_input},(first y[%{selector}]).value;
						end
						y
					end
				end
			end
      $my_test[:submit_button] = first %{#GNDC_Rental_Housing_Submit}
			$my_test[:submit_button].select_option
			$my_test[:submit_loader] = first %{.d_i_a_l_o_g_LoadingIcon}
			expect($my_test[:submit_loader].tag_name).to match  %{mat-progress-spinner}
			$my_test[:app_id] = (first %{.d_i_a_l_o_g_applicantID}, :wait => 120).text
			expect($my_test[:app_id]).not_to be_nil
			# D


			# B Grab all files even using nextPageToken
			reset = TestMod.reset_hash
			my_arg = {
				:reset => reset,
				:access_token => access_token,
				:params => {
					:q => %{name = '#{TestMod::ENVS[:angular_env][%{testingAcct}][%{capybara}][%{url}]}'}
				},
			}
			reset = TestMod.get_all_files my_arg
			# B

			# C get the spreadsheet values
			my_arg = {
				:reset => reset,
				:access_token => access_token,
				:file => reset[:files][0],
				:range => %{B3:ZZ}
			}
			(TestMod::ENVS[:website].fetch %{google-sheets-mapping}).each do |k,v|
				my_arg[:subsheet] = v
				reset[:subsheets].store(v,(TestMod.get_subsheet_values my_arg))
			end
			# C

			# E compare the user values to the spreadsheet values
			reset[:subsheets].each do |k,v|
				subsheet = {
					:name => k,
					:aid_field_name => nil,
					:aid_index => nil,
					:user_app => nil
				}
				field_names = v[%{values}][0]

				# AA get the AID Field for the submitted application
				aid_extra_mapping = TestMod::ENVS[:website][%{extra_mapping}].fetch %{applicantID};
				# for some reason ruby does not see the block and returns and enumerable
				aid_extra_mapping.select do |x|
					unless (x.fetch %{key},nil) != subsheet[:name]
						subsheet[:aid_field_name] = (x.fetch %{value})
						.select do |x|
							x[0] == %{field}
						end
						subsheet[:aid_field_name] = subsheet[:aid_field_name].at 0
						subsheet[:aid_field_name] = subsheet[:aid_field_name].at 1
					end
				end
				#
				# AA

				# BB Find the users application in the spreadsheet
				p subsheet[:name]
				subsheet[:aid_index] = v[%{values}][0].index  subsheet[:aid_field_name]
				subsheet[:user_app] = (v[%{values}].select do |x|
					(x.at subsheet[:aid_index]) == $my_test[:app_id]
				end)
				subsheet[:user_app].each do |x|
					x.collect!.with_index do |y,j|
						{
							:field => field_names[j],
							:value => y
						}
					end
				end
				# PP.pp subsheet[:user_app]
				# BB

				# CC go through the user entered values and compare them with the spreadsheet
					# were just doing the first values, 90% towards not provide a solution to get the multiple fields
					# did not come out as planned just make sure smaller array more data is ending up in the right spot in the form
				# PP.pp subsheet[:user_app]
				subsheet[:user_app].collect! do |x| #subsheet_entry
					x.delete_if do |xx|
						user_entry = {}
						TestMod::ENVS[:website][%{convertCMS}].each do |y|
							hold_1 = false
							unless y[%{type_slug}] != %{forms}
								(y.fetch %{metafields}).each do |z|
									unless xx == user_entry
										user_entry = {
											:field => (
												((((z.fetch %{googleSheets},{}).fetch subsheet[:name],[[]]).select do |w|
													w[0] == "field"
												end).flatten).at 1
											),
											:value => (z.fetch %{user_input},%{})
										}
										# PP.pp xx
										# PP.pp user_entry
										# p  xx == user_entry
										# if xx[:field] == user_entry[:field]
										# 	# PP.pp user_entry
										# end
										if xx == user_entry
											hold_1 = true
											break
										end
									end
								end
							end
							if hold_1
								break
							end
						end
						# PP.pp xx
						# PP.pp user_entry
						# print "\n\n"
						xx == user_entry
					end
					x
				end

				PP.pp subsheet[:user_app]
				# CC
			end


			# E

		end
  end

  RSpec.feature %{user fills form properly}    do
		scenario %{no files} do

			angular_env = TestMod::ENVS[:angular_env]
      envs = $envs
			my_arg = {
				:execute_script => method(:execute_script),
				:angular_env => TestMod::ENVS[:angular_env]
			}

			# A fill out the form
			execute_script %Q{
				capybara_env.env.submission.invalidate.any = false
				capybara_env.fakeValues()
			}
			# A

      # B make sure form is submitted sucessfully
			Capybara.ignore_hidden_elements = false
      $my_test[:submit_button] = first %{#GNDC_Rental_Housing_Submit}
			$my_test[:submit_button].select_option
			$my_test[:submit_loader] = first %{.d_i_a_l_o_g_LoadingIcon}
			expect($my_test[:submit_loader].tag_name).to match  %{mat-progress-spinner}
			$my_test[:app_id] = first %{.d_i_a_l_o_g_applicantID}, :wait => 120
			expect($my_test[:app_id]).not_to be_nil
			$my_test[:all_id] = TestMod.check_spreadsheet_id my_arg
			expect($my_test[:all_id].count $my_test[:app_id].text).to be > 0
      # B
		end

		scenario %{files}  do

			envs = $envs
			access_token = $access_token
      reset = $reset
			my_arg = {
				:execute_script => method(:execute_script),
				:angular_env => TestMod::ENVS[:angular_env]
			}

			# A fill out the form
			execute_script %Q{
				capybara_env.env.submission.invalidate.any = false
				capybara_env.fakeValues()
			}
			Capybara.ignore_hidden_elements = false
			# A


			# C upload files
			file_input = first %{input[type="file"]}
      sample_files = $sample_files.select do
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
      $my_test[:submit_button] = first %{#GNDC_Rental_Housing_Submit}
			$my_test[:submit_button].select_option
			$my_test[:submit_loader] = first %{.d_i_a_l_o_g_LoadingIcon}
			expect($my_test[:submit_loader].tag_name).to match  %{mat-progress-spinner}
			$my_test[:app_id] = first %{.d_i_a_l_o_g_applicantID}, :wait => 120
      expect($my_test[:app_id]).not_to be_nil
			$my_test[:all_id] = TestMod.check_spreadsheet_id my_arg
			expect($my_test[:all_id].count $my_test[:app_id].text).to be > 0
      # D


    end
  end

	RSpec.feature %{user makes one mistake}    do

		scenario %{1 mistake}   do

			angular_env = TestMod::ENVS[:angular_env]
      envs = $envs
			my_arg = {
				:execute_script => method(:execute_script),
				:angular_env => TestMod::ENVS[:angular_env]
			}

			# A fill out the form
			execute_script %Q{
        capybara_env.env.submission.invalidate.any = true
				capybara_env.fakeValues()
			}
			Capybara.ignore_hidden_elements = false
			# A

			# B the end user finds the items highlighted in red
			sleep 8
      $my_test[:submit_button] = first %{#GNDC_Rental_Housing_Submit}
			$my_test[:submit_button].select_option
			$my_test[:invalid_button] =first %{.a_p_p_Button.d_i_a_l_o_g_Close}
			$my_test[:invalid_button].select_option
			$my_test[:invalid_input] =  all %{.a_p_p_InputInvalid , .f_o_r_m_InputInvalid}
			$my_test[:invalid_input].each do |el|
				case el[:class]
				when (TestMod::case_substring  :sub => %{f_o_r_m_Email})

					el.fill_in :with => %{corrected@yahoo.com}
				when (TestMod::case_substring  :sub => %{a_p_p_Number})

					el.fill_in :with => (rand 2000..120000)
				when (TestMod::case_substring  :sub => %{a_p_p_Input})

					el.fill_in :with => %{End user corrected theirselves}
				when (TestMod::case_substring  :sub => %{a_p_p_Selection})

					el.select_option
				when (TestMod::case_substring  :sub => %{a_p_p_TextArea})

					el.fill_in :with => %{End user corrected theirselves}
				else

				end
			end
			# B


      # C make sure form is submitted sucessfully
      $my_test[:submit_button] = first %{#GNDC_Rental_Housing_Submit}
			$my_test[:submit_button].select_option
			$my_test[:submit_loader] = first %{.d_i_a_l_o_g_LoadingIcon}
			expect($my_test[:submit_loader].tag_name).to match  %{mat-progress-spinner}
			$my_test[:app_id] = first %{.d_i_a_l_o_g_applicantID}, :wait => 120
			expect($my_test[:app_id]).not_to be_nil
			$my_test[:all_id] = TestMod.check_spreadsheet_id my_arg
			expect($my_test[:all_id].count $my_test[:app_id].text).to be > 0
      # C

		end

		scenario %{1 mistake files}   do

			angular_env = TestMod::ENVS[:angular_env]
      envs = $envs
			my_arg = {
				:execute_script => method(:execute_script),
				:angular_env => TestMod::ENVS[:angular_env]
			}

			# A fill out the form
			execute_script %Q{
        capybara_env.env.submission.invalidate.any = true
				capybara_env.fakeValues()
			}
			Capybara.ignore_hidden_elements = false
			# A

			# C upload files
			file_input = first %{input[type="file"]}
      sample_files = $sample_files.select do
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

			# B the end user finds the items highlighted in red
      $my_test[:submit_button] = first %{#GNDC_Rental_Housing_Submit}
			$my_test[:submit_button].select_option
			$my_test[:invalid_button] =first %{.a_p_p_Button.d_i_a_l_o_g_Close}
			$my_test[:invalid_button].select_option
			$my_test[:invalid_input] =  all %{.a_p_p_InputInvalid , .f_o_r_m_InputInvalid}
			$my_test[:invalid_input].each do |el|
				case el[:class]
				when (TestMod::case_substring  :sub => %{f_o_r_m_Email})

					el.fill_in :with => %{corrected@yahoo.com}
				when (TestMod::case_substring  :sub => %{a_p_p_Number})

					el.fill_in :with => (rand 2000..120000)
				when (TestMod::case_substring  :sub => %{a_p_p_Input})

					el.fill_in :with => %{End user corrected theirselves}
				when (TestMod::case_substring  :sub => %{a_p_p_Selection})

					el.select_option
				when (TestMod::case_substring  :sub => %{a_p_p_TextArea})

					el.fill_in :with => %{End user corrected theirselves}
				else

				end
			end
			# B


      # D make sure form is submitted sucessfully
      $my_test[:submit_button] = first %{#GNDC_Rental_Housing_Submit}
			$my_test[:submit_button].select_option
			$my_test[:submit_loader] = first %{.d_i_a_l_o_g_LoadingIcon}
			expect($my_test[:submit_loader].tag_name).to match  %{mat-progress-spinner}
			$my_test[:app_id] = first %{.d_i_a_l_o_g_applicantID}, :wait => 120
			expect($my_test[:app_id]).not_to be_nil
			$my_test[:all_id] = TestMod.check_spreadsheet_id my_arg
			expect($my_test[:all_id].count $my_test[:app_id].text).to be > 0
      # D

    end
	end

	RSpec.feature %{user makes many mistakes}  do
		scenario %{many mistake}   do

			angular_env = TestMod::ENVS[:angular_env]
      envs = $envs
			my_arg = {
				:execute_script => method(:execute_script),
				:angular_env => TestMod::ENVS[:angular_env]
			}

			# A fill out the form
			execute_script %Q{
        capybara_env.env.submission.invalidate.any = true
				capybara_env.fakeValues()
			}
			Capybara.ignore_hidden_elements = false

			# A

			# B the end user finds the items highlighted in red
			rand(2..5).times do
				$my_test[:submit_button] = first %{#GNDC_Rental_Housing_Submit}
				$my_test[:submit_button].select_option
				$my_test[:invalid_button] =first %{.a_p_p_Button.d_i_a_l_o_g_Close}
				$my_test[:invalid_button].select_option
				$my_test[:invalid_input] =  all %{.a_p_p_InputInvalid , .f_o_r_m_InputInvalid}
			end
			$my_test[:invalid_input].each do |el|
				case el[:class]
				when (TestMod::case_substring  :sub => %{f_o_r_m_Email})

					el.fill_in :with => %{corrected@yahoo.com}
				when (TestMod::case_substring  :sub => %{a_p_p_Number})

					el.fill_in :with => (rand 2000..120000)
				when (TestMod::case_substring  :sub => %{a_p_p_Input})

					el.fill_in :with => %{End user corrected theirselves}
				when (TestMod::case_substring  :sub => %{a_p_p_Selection})

					el.select_option
				when (TestMod::case_substring  :sub => %{a_p_p_TextArea})

					el.fill_in :with => %{End user corrected theirselves}
				else

				end
			end
			# B


      # C make sure form is submitted sucessfully
      $my_test[:submit_button] = first %{#GNDC_Rental_Housing_Submit}
			$my_test[:submit_button].select_option
			$my_test[:submit_loader] = first %{.d_i_a_l_o_g_LoadingIcon}
			expect($my_test[:submit_loader].tag_name).to match  %{mat-progress-spinner}
			$my_test[:app_id] = first %{.d_i_a_l_o_g_applicantID}, :wait => 120
			expect($my_test[:app_id]).not_to be_nil
			$my_test[:all_id] = TestMod.check_spreadsheet_id my_arg
			expect($my_test[:all_id].count $my_test[:app_id].text).to be > 0
      # C

		end

		scenario %{many mistake files}   do

			angular_env = TestMod::ENVS[:angular_env]
      envs = $envs
			my_arg = {
				:execute_script => method(:execute_script),
				:angular_env => TestMod::ENVS[:angular_env]
			}

			# A fill out the form
			execute_script %Q{
        capybara_env.env.submission.invalidate.any = true
				capybara_env.fakeValues()
			}
			Capybara.ignore_hidden_elements = false
			# A

			# C upload files
			file_input = first %{input[type="file"]}
      sample_files = $sample_files.select do
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

			# B the end user finds the items highlighted in red
			rand(2..5).times do
				$my_test[:submit_button] = first %{#GNDC_Rental_Housing_Submit}
				$my_test[:submit_button].select_option
				$my_test[:invalid_button] =first %{.a_p_p_Button.d_i_a_l_o_g_Close}
				$my_test[:invalid_button].select_option
				$my_test[:invalid_input] =  all %{.a_p_p_InputInvalid , .f_o_r_m_InputInvalid}
			end
			$my_test[:invalid_input].each do |el|
				case el[:class]

				when (TestMod::case_substring  :sub => %{f_o_r_m_Email})

					el.fill_in :with => %{corrected@yahoo.com}
				when (TestMod::case_substring  :sub => %{a_p_p_Number})

					el.fill_in :with => (rand 2000..120000)
				when (TestMod::case_substring  :sub => %{a_p_p_Input})

					el.fill_in :with => %{End user corrected theirselves}
				when (TestMod::case_substring  :sub => %{a_p_p_Selection})

					el.select_option
				when (TestMod::case_substring  :sub => %{a_p_p_TextArea})

					el.fill_in :with => %{End user corrected theirselves}
				else

				end
			end
			# B


      # D make sure form is submitted sucessfully
      $my_test[:submit_button] = first %{#GNDC_Rental_Housing_Submit}
			$my_test[:submit_button].select_option
			$my_test[:submit_loader] = first %{.d_i_a_l_o_g_LoadingIcon}
			expect($my_test[:submit_loader].tag_name).to match  %{mat-progress-spinner}
			$my_test[:app_id] = first %{.d_i_a_l_o_g_applicantID}, :wait => 120
			expect($my_test[:app_id]).not_to be_nil
			$my_test[:all_id] = TestMod.check_spreadsheet_id my_arg
			expect($my_test[:all_id].count $my_test[:app_id].text).to be > 0
      # D

    end

	end
end


def stagingTest
	@javascript

  RSpec.feature %{staging} do

		scenario %{Token Issue}   do

			# A send a gapi request with a bad token
			execute_script %Q{


					window.capybara_env.seeef = (devObj)=>{

						console.log("fired")
						// authorize the app
						let creds= null
						let xhr = new XMLHttpRequest();

						xhr.addEventListener("load", function() {
								creds = JSON.parse(xhr.response)
						});

						xhr.addEventListener("error", function() {
							creds = JSON.parse(xhr.response)
							console.log("error fired")
						});


						xhr.open("POST","https://oauth2.googleapis.com/token",false)
						xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded")

						xhr.send(`grant_type=urn%3Aietf%3Aparjwt-bearer&assertion=`)
						//

						return {creds}

				}
			}
			# A

			$my_test[:submit_button] = first %{#GNDC_Rental_Housing_Submit}
			$my_test[:submit_button].select_option

			sleep 60



    end

	end


end




startTest
# stagingTest
