require 'capybara'
require 'capybara/dsl'
require 'capybara/rspec'
require 'capybara/rspec/matcher_proxies'
require 'rspec/expectations'
require 'rails_helper'
require 'percy'
require 'selenium/webdriver'
require 'selenium-webdriver'
load 'custom_exports.rb'



# $:.each do |d|
#     p d 
# end 

# ENV.each {|k,v| puts "#{k}: #{v}"}  

module TestMod

  # include Capybara
  include Capybara::DSL
  # include Capybara::Selenium
  include Selenium

  # monkey patch to avoid reset sessions
  class Capybara::Selenium::Driver < Capybara::Driver::Base
    def reset!
      if @browser
        @browser.navigate.to('about:blank')
      end
    end
  end
  
  # Selenium::WebDriver.logger.level = :debug
  # Selenium::WebDriver.logger.output = 'selenium.log'

  config = Hash.new 
  config[:user] = ENV['LT_USERNAME']  
  config[:key] = ENV['LT_APIKEY'] 
  
  
   
  Capybara.register_driver :lambdatest do |app|
    # p app
    caps = {                       
      :browserName => "chrome",         
      :version => "76.0",         
      :platform =>  "win10",
      :name =>  "RSpec Sample Test",
      :build =>  "RSpec Selenium Sample",      
      :network =>  true,
      :visual =>  true,
      :video =>  true,
      :console =>  true,
      :tunnel =>true,
      :resolution => "1280x1024"
    } 
  
    a =Capybara::Selenium::Driver.new(
      app,
      :browser => :remote,
      :url => "https://#{config[:user]}:#{config[:key]}@hub.lambdatest.com/wd/hub",
      :desired_capabilities => caps
    )
    # puts a.class
    # puts a.options
    #  a.for(:remote,
    # :url => "https://#{config[:user]}:#{config[:key]}@hub.lambdatest.com/wd/hub",
    # :desired_capabilities => caps)
  end

  Capybara.register_driver :internetExplorer do |app|
    
    # p Capybara::Selenium::Driver::InternetExplorerDriver.options

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
      })
    )
    
    
    
  end    

  Capybara.register_driver :edgeBrowser do |app|
    
    # p Capybara::Selenium::Driver::InternetExplorerDriver.options

    

    Capybara::Selenium::Driver.new(
      app,
      :browser => :edge,
      :desired_capabilities =>Selenium::WebDriver::Remote::Capabilities::edge({
        :javascript_enabled => true,
        :css_selectors_enabled => true,
      }),
    )
    
    
    
  end    

  Capybara.run_server = false  


  Capybara.configure do |config|
  # config.default_max_wait_time = 20
    # config.w3c_click_offset = true
    # Capybara.current_session.driver.browser.manage.window.resize_to 100, 100
  end

  RSpec.configure do |config|
    # my_drivers = %i{   selenium internetExplorer edgeBrowser selenium_chrome     }
    # my_drivers = %i{   selenium internetExplorer edgeBrowser      }
    # my_drivers = %i{  edgeBrowser  }
    # my_drivers = %i{ opera }
    my_drivers = %i{ selenium }
    hosts = Hash.new 
    # hosts[:prod] =  %{https://watermine.firebaseapp.com}
    hosts[:dev] =  %{http://localhost:4200}
    config.around do |example|
      p example 
      my_drivers.each do |browser|
        hosts.each do |k,v|
          Capybara.current_driver = browser
          Capybara.app_host = v
          p Capybara.app_host.to_s +  %{  in } + Capybara.current_driver.to_s           
          example.run
        end    
      end  
    end  
    config.after :suite do
      # system %{taskkill /IM MicrosoftEdge.exe}
      system %{taskkill /IM MicrosoftEdge.exe -F}
      system %{taskkill /IM MicrosoftWebDrivers.exe}
    end    
  end
  
  def TestMod.startTest  
    @javascript
    helper_mod = CustomExports.new
    # need hosts[:tests] so you dont make the ryberService and the componentObject.ts avail in production 
    RSpec.feature %{city dropdown} do
          
      scenario %{ and if a city text size is option selected it will expand the input} do
        visit %{/}
        elem = first %{.p_a_n_e_l_ButtonText} 
        elem.select_option
        options = all %{.p_a_n_e_l_Option}        
        button = first %{.p_a_n_e_l_NextButton} 
        button.select_option   
        sleep 5         
        Capybara.ignore_hidden_elements = false 
        input = first %{.p_a_n_e_l_Input}
        sleep 5  
        input.send_keys %{AR}
        stateOpt = all %{.p_a_n_e_l_StateOption}  
        button.select_option
        sleep 3
        input = Hash.new 
        input[:element] = all %{.p_a_n_e_l_Input}
        input[:element].at(1).send_keys %{BE}
        sleep 2 
        city_options = all %{.p_a_n_e_l_CityOption}
        city_options.at(5).select_option
        sleep 2
        input[:width] = input[:element].at(1).style %{width}
        input[:font_family]  = input[:element].at(1).style %{font-family}
        input[:font_size]  = input[:element].at(1).style %{font-size}
        p input[:width]
        input[:text_width] = Hash.new 
        input[:text_width][:font]   = input[:font_size][%{font-size}] +" "+input[:font_family][%{font-family}]
        input[:text_width][:elementText] = input[:element].at(1).text
        input[:text_width][:canvas] = evaluate_script  %Q{
          (()=>{
            canvas = document.createElement('canvas') 
            ctx = canvas.getContext("2d")
            ctx.font = window.getComputedStyle(document.querySelectorAll('.p_a_n_e_l_Input')[1])["font-size"] + 
            " "+
            window.getComputedStyle(document.querySelectorAll('.p_a_n_e_l_Input')[1])["font-family"] 
            return ctx.measureText(document.querySelectorAll('.p_a_n_e_l_Input')[1].value).width;             
          })()         
        }
        p input[:text_width][:canvas]   
        expect( helper_mod.number_parse(input[:width][%{width}])  ).to be > input[:text_width][:canvas].to_i 
      end  


    end
  end
end
TestMod.startTest



=begin
  for navigation you must head to all the links
=end