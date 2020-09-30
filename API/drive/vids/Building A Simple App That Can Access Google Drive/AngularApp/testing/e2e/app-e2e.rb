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
  percy_snapshot_counter = 0
  
  
   
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

  
  

  # Capybara.default_driver = :lambdatest 
  Capybara.run_server = false  


  Capybara.configure do |config|
  # config.default_max_wait_time = 20
    # config.w3c_click_offset = true
    # Capybara.current_session.driver.browser.manage.window.resize_to 100, 100
  end


  RSpec.configure do |config|
    # my_drivers = %i{   selenium internetExplorer edgeBrowser  selenium_chrome    }
    my_drivers = %i{   selenium internetExplorer edgeBrowser      }
    # my_drivers = %i{  edgeBrowser selenium }
    # my_drivers = %i{  internetExplorer  }
    # my_drivers = %i{ opera }
    # my_drivers = %i{ edgeBrowser }
    hosts = Hash.new 
    # hosts[:prod] =  %{https://michaelodumosu57.github.io/web_project}
    # hosts[:dev] =  %{http://localhost:4200}
    hosts[:staging] =  %{http://localhost:8001} 
     
    
    
    config.around do |example|
      p example 
      my_drivers.each do |browser|
        hosts.each do |k,v|
          Capybara.current_driver = browser
          Capybara.app_host = v
          p Capybara.app_host.to_s +  %{  in } + Capybara.current_driver.to_s   
          unless  example.metadata[:description] == %{percy snaps} and percy_snapshot_counter == 1
            example.run
            if example.metadata[:description] == %{percy snaps} and percy_snapshot_counter != 1
              percy_snapshot_counter += 1
            end 
            p %{this is the counter } + percy_snapshot_counter.to_s
          end
          # example.run
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
    
    
    RSpec.feature %{navigation stuff} do        
      scenario %{I can get to homepage} do
        visit '/'
        sleep 2
      end                         
    end

    RSpec.feature %{visual regression} do
      scenario %{dev view} do
        visit '/'
        # p %{ran } + percy_snapshot_counter.to_s + %{ times}   idk why rbuy cant pick it up
        widths = %w{300  560  770  1020  1110}      
        widths.each_with_index do |width,i| 
          page.current_window.resize_to width.to_i, 800
          sleep 3
        end        
      end      
      scenario %{percy snaps} do
        visit '/'
        # p %{ran } + percy_snapshot_counter.to_s + %{ times}   idk why rbuy cant pick it up
        widths = %w{300  560  770  1020  1110}      
        widths.each_with_index do |width,i| 
          page.current_window.resize_to width.to_i, 800
          # sleep 2
          Percy.snapshot page, { :name => %{ form page } + i.to_s , :widths => [width.to_i] }
        end        
      end
    end  
    
  end


end
TestMod.startTest



