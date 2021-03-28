# require %{em/pure_ruby}
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
# load  %{testmod.rb}
# require %{billy/capybara/rspec}



# class Capybara::Selenium::Driver < Capybara::Driver::Base
# 	def reset!
# 		if @browser
# 			@browser.navigate.to('about:blank')
# 		end
# 	end
# end


# dev setup

class Capybara::Node::Element
def select_option(wait: nil)
    begin
	raise 's'
    rescue => exception
	scroll_to self
	synchronize(wait) { base.click }
	self
    end
end
end
# Selenium::WebDriver.logger.level = :debug
# Selenium::WebDriver.logger.output = %{selenium.log}
Capybara.raise_server_errors = false
Capybara.run_server = false
Capybara.default_max_wait_time = 5
Capybara.ignore_hidden_elements = false


# Selenium::WebDriver::Firefox::Binary.path="/mnt/c/Users/Restop-2345/unneeded/Mozilla\ Firefox/firefox.exe"
Selenium::WebDriver::Firefox::Binary.path = %{C://Users//Restop-2345//unneeded//Mozilla Firefox//firefox.exe}
# Selenium::WebDriver::Firefox::Binary.driver_path="/mnt/c/Users/Restop-2345/unneeded/ruby/geckodriver.exe"



$client = nil


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

Capybara.register_driver :seleniumChrome do |app|

	Capybara::Selenium::Driver.new(
		app,
		:browser => :selenium_chrome
	)
end


Capybara.register_driver :firefox_profile do |app|
	desired_caps = Selenium::WebDriver::Remote::Capabilities.firefox
	# desired_caps[:firefox_profile] = %{file:///C:/Users/oluod/My_Notebook/angular/v10/GNDC/CLT-GNDC/testing/e2e/firefox_profile}
	# desired_caps[:firefox_profile] = %{C:/Users/oluod/My_Notebook/angular/v10/GNDC/CLT-GNDC/testing/e2e/firefox_profile}
	# desired_caps[:firefox_profile] = %{capybara}
	# service = Selenium::WebDriver::Service.firefox :args => [%{-vv}]
	# options = Selenium::WebDriver::Firefox::Options.new :args => [%{-profile=C:\\Users\\oluod\\My_Notebook\\angular\\v10\\GNDC\\CLT-GNDC\\testing\\e2e\\firefox_profile}]
	# options.profile = Selenium::WebDriver::Firefox::Profile.new %{C:\\Users\\oluod\\My_Notebook\\angular\\v10\\GNDC\\CLT-GNDC\\testing\\e2e\\firefox_profile}

	# options.log_level = %{debug}
	Capybara::Selenium::Driver.new(
			app,
			:browser => :ff,
			:desired_capabilities => desired_caps,
			# :options =>   options,
			# :service => service
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

# Billy.configure do |c|
# 	c.record_requests = true
# end

RSpec.configure do |config|


	# my_drivers = %i{ edgeBrowser internetExplorer selenium }
	# my_drivers = %i{ edgeBrowser }
	# my_drivers = %i{ selenium_billy }
	my_drivers = %i{ firefox_profile}
	# my_drivers = %i{seleniumChrome}
	# my_drivers = %i{ internetExplorer }
	hosts = Hash.new
	hosts[:dev] =  %{http://localhost:8000}

	config.full_backtrace = false
	config.backtrace_exclusion_patterns = [
			/\/lib\d*\/ruby\//,
			/bin\//,
			/gems/,
			/spec\/spec_helper\.rb/,
			/lib\/rspec\/(core|expectations|matchers|mocks)/
	]

config.before :example do
#     page.driver.quit
#     begin
# 	page.driver.close_window page.windows.last.handle
#     rescue => exception

#     end
    visit %{/}
    page.current_window.maximize
		sleep 2
		# page.fullscreen
#     # $client =  DropboxApi::Client.new %{AN-8rJ0XuEwAAAAAAAAAATUAu6uTWRtwFG8s7WOMmdIoHdYI4Ep2yYw3mOfh5MyO}
end


config.after :example do
    # page.driver.quit
    # begin
    # 	page.driver.close_window page.windows.last.handle
    # rescue => exception

    # end
    #logout
end

config.around do |example|
    $example  = example
    my_drivers.each do |browser|
	hosts.each do |k,v|
	    Capybara.current_driver = browser
	    Capybara.app_host = v
			    # A Identifying and running each scenario
			    # PP.pp example.metadata
			    p Capybara.app_host.to_s +  %{ in } + Capybara.current_driver.to_s
			    p %{scenario #{example.metadata[:description]}}
			    begin
				    example.run
			    rescue => exception
				    page.driver.quit
			    end
			    # A
	end
    end
end
config.after :suite do
    system %{takill /IM MicrosoftEdge.exe -F}
    system %{taskkill /IM MicrosoftWebDrivers.exe}
end
end


def stagingTest
@javascript

	RSpec.feature %{navigation stuff}, :skip => true     do
    # scenario %{I can work with puffing billy} do
    # 	visit %{/}
    # 	# puts TablePrint::Printer.table_print(Billy.proxy.requests, [
    # 	# 	:status,
    # 	# 	:handler,
    # 	# 	:method,
    # 	# 	{ url: { width: 100 } },
    # 	# 	:headers,
    # 	# 	:body
    # 	# ])
	    # end
		scenario %{I can visit the website} do

			visit %{/}
		end
  end

	# works only on play
	RSpec.feature %{ nesting}, :skip => true  do

		scenario %{When I hit add and remove buttons I get what I need} do

			# for the multiples pressing the add & button random times
			adding = rand(6..9)
			removing = rand(3..5)
			adding.times do
				(first %{.f_o_r_m_add-schema}).select_option
			end
			removing.times do
				(first %{.f_o_r_m_remove-schema}).select_option
			end
			sleep 2
			result = (all %{.a_p_p_Count}).length

			expect(result -1 ).to eq (adding - removing)
			#

		end


		scenario %{the subtitle is nested appropriately} do
			sub_heading = first %{.a_p_p_sub-heading}
			p sub_heading
			expect(sub_heading.find(:xpath, '..')[:className]).to start_with(%{a_p_p_Nester})
		end

		scenario %{when i add nested items in div, they are duplicated as intended}  do
			# as this version of Judima, only direct children get copied properly, if an item
			# to be copied has indirect zChildren errors might occur
			add_button = first %{.f_o_r_m_add-schema}
			add_button.select_option
			all_inputs = all %{[class*="f_o_r_m_form-item-container"]}
			# expect there to be a duplicate
			expect(all_inputs.length).to eq 2
			# expect the elements in the form item to be 2
			expect(  (all_inputs.at 1).all(%{*})   ).to eq 2

		end

		scenario %{when nest mutliple acts,
			nothing happens to the formatting of top level desktop}, :skip=>true  do
				add_button = first %{.f_o_r_m_add-schema}
				remove_button = first %{.f_o_r_m_remove-schema}
			after_items = {
				:elements => [
					(all %{[class*="f_o_r_m_schema-mode"]}).to_a ,
					(first %{[class*="f_o_r_m_counter"]})   ,
					(first %{[class*="f_o_r_m_schema-dropdown"]})
				]
			}
			after_items[:elements] = after_items[:elements].flatten
			after_items[:first_top] =  after_items[:elements].collect do |x|
				(x.style %{top})[%{top}]
			end
			add_button.select_option
			after_items[:second_top] =  after_items[:elements].collect do |x|
				(x.style %{top})[%{top}]
			end

			# test that the format does not change
				# might as well test the whole format
			after_items[:first_top].each.with_index do |x,i|
				expect(x).to eq(after_items[:second_top][i])
			end
			#

			# shrink the window
			size = 500
			begin
				page.current_window.resize_to size, 800
			rescue => e
				execute_script %Q{
					resizeTo(#{size},800)
				}
			end
			#

			# check that they are stacked appropriately
			after_items[:third_top] =  after_items[:elements].collect do |x|
				(numberParse :dimension=>(x.style %{top})[%{top}]).to_i
			end
			after_items[:third_top].inject do |acc,x|
				expect(acc).to be < x
				x
			end
			#

			# back to desktop size
			size = 1500
			begin
				page.current_window.resize_to size, 800
			rescue => e
				execute_script %Q{
					resizeTo(#{size},800)
				}
			end
			#

			# check that desktop format is regained
			after_items[:fourth_top] =  after_items[:elements].collect do |x|
				(x.style %{top})[%{top}]
			end
			after_items[:fourth_top].each.with_index do |x,i|
				expect(x).to eq(after_items[:second_top][i])
			end
			#

			PP.pp after_items



		end

		scenario %{when nest mutliple acts, nothing happens to the formatting of top level mobile}  do
			# grab elements
			add_button = first %{.f_o_r_m_add-schema}
			remove_button = first %{.f_o_r_m_remove-schema}
			after_items = {
				:elements => [
					(all %{[class*="f_o_r_m_schema-mode"]}).to_a ,
					(first %{[class*="f_o_r_m_counter"]})   ,
					(first %{[class*="f_o_r_m_schema-dropdown"]})
				]
			}
			after_items[:elements] = after_items[:elements].flatten

			#

			# shrink the window
			size = 500
			begin
				page.current_window.resize_to size, 800
			rescue => e
				execute_script %Q{
					resizeTo(#{size},800)
				}
			end
			add_button.select_option
			#

			# check that they are stacked appropriately
			after_items[:third_top] =  after_items[:elements].collect do |x|
				(numberParse :dimension=>(x.style %{top})[%{top}]).to_i
			end
			after_items[:third_top].inject do |acc,x|
				expect(acc).to be < x
				x
			end
			#

			# back to desktop size
			size = 1500
			begin
				page.current_window.resize_to size, 800
			rescue => e
				execute_script %Q{
					resizeTo(#{size},800)
				}
			end
			#

			# make sure desktop size is working
			after_items[:desktop_top_one] =  after_items[:elements].collect do |x|
				(numberParse :dimension=>(x.style %{top})[%{top}]).to_i
			end
			expect(after_items[:desktop_top_one].at(0)).to eq after_items[:desktop_top_one].at(1)
			expect(after_items[:desktop_top_one].at(2)).to eq after_items[:desktop_top_one].at(3)
			#

			# shrink the window
			size = 500
			begin
				page.current_window.resize_to size, 800
			rescue => e
				execute_script %Q{
					resizeTo(#{size},800)
				}
			end
			add_button.select_option
			#

			# check that they are stacked appropriately
			after_items[:second_top] =  after_items[:elements].collect do |x|
				(numberParse :dimension=>(x.style %{top})[%{top}]).to_i
			end
			after_items[:second_top].inject do |acc,x|
				expect(acc).to be < x
				x
			end
			#


			PP.pp after_items



			end


	end

	RSpec.feature %{latching}, :skip => true do
		scenario %{latching items should exist}  do
			latch_elements = all %{[class*="f_o_r_m_schema-mode"]}
			latch_elements[0].send_keys %{REPEAT}
			latch_elements[1].send_keys %{}
			sleep 2
			latch_attached_elements = all %{.f_o_r_m_mode-handler}
			expect(latch_attached_elements).to be_truthy

		end

		scenario %{latching items should be positioned as intended}  do
			# here the latched elements should be below the element
			latch ={
				:elements => (all %{[class*="f_o_r_m_schema-mode"]}),
				:style => nil,
				:value => 0
			}
			latch[:elements][0].send_keys %{REPEAT}
			latch[:elements][1].send_keys %{}
			sleep 2
			# grab the css for the target and its attachment
			latch_attached = {
				:elements => (all %{.f_o_r_m_mode-handler}),
				:style => nil,
				:value => 0
			}
			latch[:style] = latch[:elements][0].style %{height},%{top}
			latch_attached[:style] = latch_attached[:elements][0].style %{top}
			#

			# calculate the values when ther are supposed to be next to each other
			latch[:style].each do |k,v|

				latch[:value] += (numberParse :dimension => v).to_f
			end
			latch_attached[:style].each do |k,v|

				latch_attached[:value] += (numberParse :dimension => v).to_f
			end
			#

			# test
			expect(latch[:value]).to eq latch_attached[:value]
			#


		end

		scenario %{window resize latch attachment moves with the target} do
			widths = %w{300  1020  1510}.collect &:to_i
			# here the latched elements should be below the element
			latch ={
				:elements => (all %{[class*="f_o_r_m_schema-mode"]}),
				:style => nil,
				:value => 0
			}
			latch[:elements][0].send_keys %{REPEAT}
			latch[:elements][1].send_keys %{}
			sleep 2
			# grab the css for the target and its attachment
			latch_attached = {
				:elements => (all %{.f_o_r_m_mode-handler}),
				:style => nil,
				:value => 0
			}
			#

			widths.each_with_index do |width,i|
				# page.fullscreen

				begin
					page.current_window.resize_to width, 800
				rescue => e
					execute_script %Q{
						resizeTo(#{width},800)
					}
				end
				# see if the values match up
				latch[:style] = latch[:elements][0].style %{height},%{top}
				latch_attached[:style] = latch_attached[:elements][0].style %{top}
				# calculate the values when ther are supposed to be next to each other
				latch[:style].each do |k,v|
					latch[:value] += (numberParse :dimension => v).to_f
				end
				latch_attached[:style].each do |k,v|

					latch_attached[:value] += (numberParse :dimension => v).to_f
				end
				#

				# test
				expect(latch[:value]).to eq latch_attached[:value]
				#

			end

		end

		scenario %{mutliple and or toggle are supported } do
			latch ={
				:elements => (all %{[class*="f_o_r_m_schema-mode"]}),
				:style => nil,
				:value => 0
			}
			# remember latchDirective specifcally works on blur
			latch[:elements][0].send_keys %{REPEAT}
			latch[:elements][1].send_keys %{REPEAT}
			latch[:elements][0].select_option
			sleep 2
			# grab the css for the target and its attachment
			latch_attached = {
				:elements => (all %{.f_o_r_m_mode-handler}),
				:style => [],
				:value => 0
			}
			expect(latch_attached[:elements].length).to eq 2

			latch[:elements][0].send_keys %{REEAT}
			latch[:elements][1].send_keys %{REEAT}
			latch[:elements][0].select_option
			latch_attached[:elements].each.with_index do |x|
				expect((x.style %{display})[%{display}]).to eq %{none}
			end
		end
	end

	# only for nesting_and_duplicate_testing
	RSpec.feature %{nested duplicates}, :skip =>true  do
		scenario %{when outside_duplicates >= 2 and inside_duplicates >  outside_duplicates app doesnt snap} do
			# grab and click add buttons
			outer_add_button = first %{.f_o_r_m_add}
			inner_add_button = first %{.f_o_r_m_add-nested-multiple}
			outer_add_button.click

			rand(4..7).times do
				inner_add_button.click
			end
			#

			# count how many counters end up
			nested_multiple ={
				:elements => (all %{[class*="a_p_p_Count a_p_p_Text f_o_r_m_my-nested-multiple-counter"]}),
			}
			nested_multiple[:counter_value] = nested_multiple[:elements].collect do |x|
				x.text
			end
			expect(   nested_multiple[:counter_value].uniq   ).to eq nested_multiple[:counter_value]

		end

		scenario %{when when outside_duplicates === 0 && inside_duplicates >  outside_duplicates on add only app doesnt snap} do

			# switch between mobile and desktop widths
			widths = %w{300  1020  1510}.collect &:to_i
			#

			# grab and click add buttons
			outer_add_button = first %{.f_o_r_m_add}
			inner_add_button = first %{.f_o_r_m_add-nested-multiple}


			rand(4..7).times do
				media_query  :width => widths.at(rand widths.size)
				outer_add_button.click
			end

			rand(4..7).times do
				media_query  :width => widths.at(rand widths.size)
				inner_add_button.click
			end
			#

			# count how many counters end up
			nested_multiple ={
				:elements => (all %{[class*="a_p_p_Count a_p_p_Text f_o_r_m_my-nested-multiple-counter"]}),
			}
			nested_multiple[:counter_value] = nested_multiple[:elements].collect do |x|
				x.text
			end
			outer_multiple ={
				:elements => (all %{[class*="a_p_p_Count a_p_p_Text f_o_r_m_my-top-level-input-counter"]}),
			}
			outer_multiple[:counter_value] = nested_multiple[:elements].collect do |x|
				x.text
			end
			expect(   nested_multiple[:counter_value].uniq   ).to eq nested_multiple[:counter_value]
			expect(   outer_multiple[:counter_value].uniq   ).to eq outer_multiple[:counter_value]

		end
	end
	RSpec.feature %{duplicates},:skip => true  do
		scenario %{add and remove in all states desktop and mobile looks fine} do


			widths = %w{300  1020  1510}.collect &:to_i
			add_button = []
			remove_button =  []
			error_indicator = first %{.f_o_r_m_my-indicator}
			error_message = first %{.f_o_r_m_my-indicator-message}

			(all %{[class*="f_o_r_m_add"]}).each do |x|
				add_button.push(x)
			end
			(all %{[class*="f_o_r_m_remove"]}).each do |x|
				remove_button.push(x)
			end
			add_button = add_button.concat add_button
			add_button = add_button.concat add_button
			add_button = add_button.concat remove_button
			click_amnt = rand(1250..1300)
			p click_amnt

			click_amnt.times do |x|
				p x
				target_button = add_button.sample
				width = widths.sample
				p target_button[:class]
				p target_button.find(:xpath, '..')[:class]
				p error_message.text
				p width
				target_button.click
				media_query :width => width
				expect(error_indicator.text).not_to eq %{An error occured}
			end

			sleep 600000000000
		end

	end

=begin
 [
	latch_dropdown_at_base_development,
	latch_dropdown_development
]
=end
	RSpec.feature %{latching_dropdown},:skip => true  do
		scenario %{test that the select value is above the other options when open} do
			select = first %{.f_o_r_m_my-dropdown-latch-dropdown-base}
			options = (capybara_result_to_array :target => (all %{.f_o_r_m_my-dropdown-latch-dropdown-base})      )
			options = options.slice(1,4)
			select.click
			value = select.style(%{top},%{height})
			value["top"]=    (numberParse :dimension =>value["top"]).to_f
			value["height"]= (numberParse :dimension =>value["height"]).to_f
			tops = {
				:values =>[value ]
			}
			options
			.each do |x|
				# execute_script %Q{
				# 	return Array.from(document.querySelectorAll(".f_o_r_m_my-dropdown-latch-dropdown-base")).slice(1)
				# 	.forEach((x,i)=>{
				# 		x.style["background-color"] = "red"
				# 	})
				# }
				value = x.style(%{top},%{height})
				value["top"]=    (numberParse :dimension =>value["top"] ).to_f
				value["height"]= (numberParse :dimension =>value["height"] ).to_f
				tops[:values].push(
					value
				)
			end

			tops[:values]
			.each_with_index.inject do |acc,x,i|

				p %{\\n}
				my_acc = acc
				.collect do |x|
					x[0]
				end
				p acc,my_acc,x
				p %{\\n}

				# make sure height of select and options are equal
					# make sure the select elements are stack one after another
				unless x[1]== 1
					expect(x[0]["height"]).to eq (my_acc.reverse[0]["height"])
					expect(x[0]["top"]).to be_within(2).of(my_acc.reverse[0]["height"] + my_acc.reverse[0]["top"])
				else
					expect(x[0]["height"]).to eq (acc[0]["height"])
					expect(x[0]["top"]).to be_within(2).of(acc[0]["height"] + acc[0]["top"])

				end
				#

				p acc,x # turns acc to array purshing values along
			end

		end

		scenario %{test that when you click an option,select gets updated,dropdown closes} do
			# select gets updated with the chosen option
			select = first %{.f_o_r_m_my-dropdown-latch-dropdown-base}
			select_text = select[:text]
			options = (capybara_result_to_array :target => (all %{.f_o_r_m_my-dropdown-latch-dropdown-base})      )
			options = options.slice(1,4)
			select.click
			item_to_click = {
				:element => options.sample
			}

			# options are same width
			options
			.each_with_index do |x,i|
				unless i == 0
					expect(x.style(%{width} )).to eq(options[i-1].style(%{width}))
				end
			end
			#


			item_to_click[:element].click
			expect( item_to_click[:element][:text]).to eq(select[:text])
			#

			# dropdown closes
			options
			.each_with_index do |x,i|
				unless i == 0
					expect(x.style(%{top},%{height} )).to eq(options[i-1].style(%{top},%{height}))
				end
			end
			#

			# update to the orgininal select al
			select.click
			item_to_click[:element].click
			expect( select_text).to eq(select[:text])
			#

			# dropdown closes
			options
			.each_with_index do |x,i|
				unless i == 0
					expect(x.style(%{top},%{height})).to eq(options[i-1].style(%{top},%{height}))
				end
			end
			#


		end

		scenario  %{test with other elements, when open it at least displays over other components} do
			select = first %{.f_o_r_m_my-dropdown-latch-dropdown-base}
			options = capybara_result_to_array :target => (all %{.f_o_r_m_my-dropdown-latch-dropdown-base})
			options = options.slice(1,4)
			select.click

			Capybara.ignore_hidden_elements = true
			options
			.each do |x|
				x.click
				select.click
			end
			Capybara.ignore_hidden_elements = false

		end
	end

=begin
 [
	latch_dropdown_nesting_development,
	latch_dropdown_at_base_development,
	latch_dropdown_development
]
=end
	RSpec.feature %{nested_latching_dropdown},:skip => true do
		scenario %{test that all elements part of the dropdown are in the required container} do
			dropdown = capybara_result_to_array :target => (all %{.f_o_r_m_my-first-dropdown-latch-dropdown-nesting})
			container = first %{.f_o_r_m_my-first-dropdown-latch-dropdown-nesting-container}
			dropdown
			.each do |x|
				expect(x.find(:xpath, '..')).to eq(container)
			end

		end

		scenario  %{test with other elements, when open it at least displays over other elements} do
			select = first %{.f_o_r_m_my-first-dropdown-latch-dropdown-nesting}
			options = capybara_result_to_array :target => (all %{.f_o_r_m_my-first-dropdown-latch-dropdown-nesting})
			options = options.slice(1,10)
			nest_container = first %{.f_o_r_m_my-overlay-latch-dropdown-nesting}
			select.click

			Capybara.ignore_hidden_elements = true
			options
			.each do |x|
				begin
					x.click
					select.click
				rescue => exception
					# never gets here because e2e is smart enough to scroll there and see it
					nest_container.scroll_to :align => :bottom
					x.click
					p x[:text]
					select.click
				end
			end
			Capybara.ignore_hidden_elements = false

		end

		scenario  %{test that on duplication, the options are copied to the respective dropdowns}, :skip => true do
			# this spec fails because something is broken in Angular
			add_button  = first %{.f_o_r_m_add-latch-dropdown-duplicate}
			add_button.click
			first_dropdown =  capybara_result_to_array :target => (all %{.f_o_r_m_my-dropdown-1-latch-dropdown-duplicate})
			second_dropdown =  capybara_result_to_array :target => (all %{.f_o_r_m_my-dropdown-2-latch-dropdown-duplicate})
			third_dropdown =  capybara_result_to_array :target => (all %{.f_o_r_m_my-dropdown-3-latch-dropdown-duplicate})
			first_dropdown
			.collect! do |x|
				x[:text]
			end
			second_dropdown
			.collect! do |x|
				x[:text]
			end
			third_dropdown
			.collect! do |x|
				x[:text]
			end
			first_dropdown = [first_dropdown.slice(0,first_dropdown.length/2),first_dropdown.slice(first_dropdown.length/2,first_dropdown.length-1)]
			second_dropdown = [second_dropdown.slice(0,second_dropdown.length/2),second_dropdown.slice(second_dropdown.length/2,second_dropdown.length-1)]
			third_dropdown = [third_dropdown.slice(0,third_dropdown.length/2),third_dropdown.slice(third_dropdown.length/2,third_dropdown.length-1)]



			first_dropdown[0].each.with_index do |x,i|
				expect(x).to eq first_dropdown[1][i]
			end

			second_dropdown[0].each.with_index do |x,i|
				expect(x).to eq second_dropdown[1][i]
			end


			third_dropdown[0].each.with_index do |x,i|
				expect(x).to eq third_dropdown[1][i]
			end

		end
	end




=begin uncomment for app testing as needed
[
	...navigation_development
]

=end
	RSpec.feature %{navigation},:skip => true  do


		scenario %{test that as you navigate the pages are the same when you leave as when you come} do

			elements = Hash.new
			20.times do |x|
				navigation = all %{p[class*='main-navigation'] }
				current = navigation.sample
				navigation_text = current.text

				current.click
				unless elements[navigation_text] != nil

					#  still comes up with auto
					# PP.pp execute_script %Q{
					# 	return Array.from(document.querySelectorAll("*"))
					# 	.map((x,i)=>{
					# 		# return {
					# 		# 	top: getComputedStyle(x)["top"],
					# 		# 	left:getComputedStyle(x)["left"]
					# 		# }
					# 	})
					# }
					#

					p navigation_text

					# page modifers
					if navigation_text == %{Blog}
						controls = all %{.a_p_p_Button}
						10.times do
							sleep 0.5
							controls.sample.click
						end
					elsif navigation_text == %{Home}
						dropdowns = dropdownSelectSelector
						5.times do
							dropdowns.sample.click
						end

					end
					#

					elements[navigation_text] = navigationPage
				else
					p %{#{navigation_text} found a match}
					new_navigation =  navigationPage

					# test the top left of the old against the top left of the new
					elements[navigation_text].each_with_index do |x,i|
						expect(x).to eq new_navigation[i]
					end
					#

					# once the test passes make the new navigation the current
					if navigation_text == %{Blog}
						controls = all %{.a_p_p_Button}
						10.times do
							sleep 0.5
							controls.sample.click
						end
					elsif navigation_text == %{Home}
						dropdowns = dropdownSelectSelector
						5.times do
							dropdowns.sample.click
						end

					end
					new_navigation = navigationPage
					elements[navigation_text] =  new_navigation
					#

				end


			end

		end

	end


=begin uncomment for app testing as needed
[
	...navigation_development
]

=end
	RSpec.feature %{display}, :skip => true   do


		scenario %{in the first display make sure that duplication is done properly} do
			first_display = all %{[class*="display1"]}
			PP.pp first_display.size

			add = first %{[class*="add-1"]}
			rand(2..3).times do |x|
				add.click
			end


			add = {
				:elements => (all %{[class*="display1"]}),
				:sorted =>[],
				:vertical => -1
			}
			add[:elements].each_with_index do |x,i|
				unless i%6 != 0
					add[:sorted].push []

				else

				end
				add[:sorted][add[:sorted].size-1].push x.style(%{top},%{left})

				unless add[:sorted].size <=	 1
					current =  add[:sorted][add[:sorted].size-1]
					previous = add[:sorted][add[:sorted].size-2]
					current_top = (numberParse :dimension => (current.at (current.size - 1) )[%{top}]).to_i
					previous_top = (numberParse :dimension => (previous.at (current.size - 1) )[%{top}]).to_i

					current_left = (numberParse :dimension => (current.at (current.size - 1) )[%{left}]).to_i
					previous_left = (numberParse :dimension => (previous.at (current.size - 1) )[%{left}]).to_i
					unless add[:vertical] != -1
						add[:vertical] = current_top - previous_top
					end
					# expect the tops to be the same distance
					expect(current_top - previous_top).to be_within(2).of(add[:vertical])

					# expect the lefts to be equal
					expect(current_left).to eq(previous_left)
				end
			end
			PP.pp add[:sorted]


		end

		scenario %{in the first display make sure that duplication and navigation is done properly} do
			first_display = all %{[class*="display1"]}
			PP.pp first_display.size

			add = first %{[class*="add-1"]}
			rand(2..3).times do |x|
				add.click
			end


			add = {
				:elements => (all %{[class*="display1"]}),
				:sorted =>[],
				:vertical => -1
			}
			add[:elements].each_with_index do |x,i|
				unless i%6 != 0
					add[:sorted].push []

				else

				end
				add[:sorted][add[:sorted].size-1].push x.style(%{top},%{left})

				unless add[:sorted].size <=	 1
					current =  add[:sorted][add[:sorted].size-1]
					previous = add[:sorted][add[:sorted].size-2]
					current_top = (numberParse :dimension => (current.at (current.size - 1) )[%{top}]).to_i
					previous_top = (numberParse :dimension => (previous.at (current.size - 1) )[%{top}]).to_i

					current_left = (numberParse :dimension => (current.at (current.size - 1) )[%{left}]).to_i
					previous_left = (numberParse :dimension => (previous.at (current.size - 1) )[%{left}]).to_i
					unless add[:vertical] != -1
						add[:vertical] = current_top - previous_top
					end
					# expect the tops to be the same distance
					expect(current_top - previous_top).to be_within(2).of(add[:vertical])

					# expect the lefts to be equal
					expect(current_left).to eq(previous_left)
				end
			end

			PP.pp add[:sorted]

			navigation = all %{p[class*='main-navigation'] }
			current = navigation.sample
			navigation_text = current.text

			current.click

			guides_navigation = first %{.f_o_r_m_guides-main-navigation}
			guides_navigation.click

			# compare the values again
			add = {
				:elements => (all %{[class*="display1"]}),
				:sorted =>[],
				:vertical => -1
			}
			add[:elements].each_with_index do |x,i|
				unless i%6 != 0
					add[:sorted].push []

				else

				end
				add[:sorted][add[:sorted].size-1].push x.style(%{top},%{left})

				unless add[:sorted].size <=	 1
					current =  add[:sorted][add[:sorted].size-1]
					previous = add[:sorted][add[:sorted].size-2]
					current_top = (numberParse :dimension => (current.at (current.size - 1) )[%{top}]).to_i
					previous_top = (numberParse :dimension => (previous.at (current.size - 1) )[%{top}]).to_i

					current_left = (numberParse :dimension => (current.at (current.size - 1) )[%{left}]).to_i
					previous_left = (numberParse :dimension => (previous.at (current.size - 1) )[%{left}]).to_i
					unless add[:vertical] != -1
						add[:vertical] = current_top - previous_top
					end
					# expect the tops to be the same distance
					expect(current_top - previous_top).to be_within(2).of(add[:vertical])

					# expect the lefts to be equal
					expect(current_left).to eq(previous_left)
				end
			end


		end


		scenario %{make sure the outer div is engulfing the targeted divs on duplication} do
			overlay  = { :element => ( first %{[class*=display-overlay]} )}
			displays = { :element => ( first %{[class*=display3]} )}


			# get the difference between the 2 sections
			overlay [:style] = overlay [:element].style  %{top},%{height}
			displays[:style] = displays[:element].style %{top},%{height}

			%w{top height}.each do |x|
				overlay [:style][x] = (numberParse :dimension => overlay [:style][x]).to_i
				displays[:style][x] = (numberParse :dimension => displays [:style][x]).to_i
			end
			overlay[:style][:y] = overlay [:style][%{top}] + overlay [:style][%{height}]
			displays[:style][:y] = displays[:style][%{top}] + displays[:style][%{height}]
			result = overlay[:style][:y] - displays[:style][:y]
			p result
			#

			# add sections
			add = first %{[class*="add-2"]}
			rand(3..7).times do |x|
				add.click
			end
			#

			# test that the overlay correctly engulfes the display
			overlay  = { :element => ( first %{[class*=display-overlay]} )}
			displays = { :element => (( all %{[class*=display3]}  ).to_a.reverse.at(0)  )}



			overlay [:style] = overlay [:element].style  %{top},%{height}
			displays[:style] = displays[:element].style %{top},%{height}

			%w{top height}.each do |x|
				overlay [:style][x] = (numberParse :dimension => overlay [:style][x]).to_i
				displays[:style][x] = (numberParse :dimension => displays [:style][x]).to_i
			end
			overlay[:style][:y] = overlay [:style][%{top}] + overlay [:style][%{height}]
			displays[:style][:y] = displays[:style][%{top}] + displays[:style][%{height}]
			expect(overlay[:style][:y] - displays[:style][:y]).to eq(result)
			#
		end

	end

	RSpec.feature %{staging}  do


		scenario %{make sure the outer div is engulfing the targeted divs on duplication} do
			overlay  = { :element => ( first %{[class*=display-overlay]} )}
			displays = { :element => ( first %{[class*=display3]} )}


			# get the difference between the 2 sections
			overlay [:style] = overlay [:element].style  %{top},%{height}
			displays[:style] = displays[:element].style %{top},%{height}

			%w{top height}.each do |x|
				overlay [:style][x] = (numberParse :dimension => overlay [:style][x]).to_i
				displays[:style][x] = (numberParse :dimension => displays [:style][x]).to_i
			end
			overlay[:style][:y] = overlay [:style][%{top}] + overlay [:style][%{height}]
			displays[:style][:y] = displays[:style][%{top}] + displays[:style][%{height}]
			result = overlay[:style][:y] - displays[:style][:y]
			p result
			#

			# add sections
			add = first %{[class*="add-2"]}
			rand(3..7).times do |x|
				add.click
			end
			#

			# test that the overlay correctly engulfes the display
			overlay  = { :element => ( first %{[class*=display-overlay]} )}
			displays = { :element => (( all %{[class*=display3]}  ).to_a.reverse.at(0)  )}



			overlay [:style] = overlay [:element].style  %{top},%{height}
			displays[:style] = displays[:element].style %{top},%{height}

			%w{top height}.each do |x|
				overlay [:style][x] = (numberParse :dimension => overlay [:style][x]).to_i
				displays[:style][x] = (numberParse :dimension => displays [:style][x]).to_i
			end
			overlay[:style][:y] = overlay [:style][%{top}] + overlay [:style][%{height}]
			displays[:style][:y] = displays[:style][%{top}] + displays[:style][%{height}]
			expect(overlay[:style][:y] - displays[:style][:y]).to eq(result)
			#
		end

		scenario %{} do

		end

	end
end


def dropdownSelectSelector
	(all %{.a_p_p_DropDownMiddle})
	.to_a
	.select! do |x|
		x.text == %{Select Item}
	end
end
def navigationPage
	(all %{*})
	.to_a
	.select! do |x|
		unless x[:class] == nil
			!(x[:class].include? %{main-navigation})
		else
			true
		end
	end
	.collect! do |x|
		x.style %{top},%{left}
	end

end

def numberParse  devObj
    dimension = devObj[:dimension]
    (dimension.split %{px}).at 0
end

def media_query devObj
	begin
		page.current_window.resize_to devObj[:width], 800
	rescue => e
		execute_script %Q{
			resizeTo(#{devObj[:width]},800)
		}
	end
end


def capybara_result_to_array devObj
	arr = []
	devObj[:target]
	.each do |x|
		arr.push x
	end
	arr
end
stagingTest
