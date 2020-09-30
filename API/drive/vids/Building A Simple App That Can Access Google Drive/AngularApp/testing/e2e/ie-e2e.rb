require 'capybara'
require 'capybara/dsl'
require 'selenium-webdriver'
require 'capybara/rspec'
require 'capybara/rspec/matcher_proxies'
require 'rspec/expectations'

# Done for demo purposes here!
Capybara.app_host = %{http://localhost:4200}

Capybara.register_driver :remote_chrome do |app|
  a = Capybara::Selenium::Driver.new(app, {
    :browser              => :ie,
    :options => Selenium::WebDriver::IE::Options.new({
      :ignore_zoom_levels => true,
      :ignore_zoom_setting => true, 
      :javascript_enabled => true
    }),
  })
  p a 
end

Capybara.default_driver = :remote_chrome

browser = Capybara.current_session
browser.visit '/'
puts browser.html
browser.driver.quit