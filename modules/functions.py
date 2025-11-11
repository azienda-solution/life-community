    
import time


import unicodedata
from urllib.parse import urlparse
from urllib.request import urlopen
import requests
import pandas as pd

from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.action_chains import ActionChains
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support import expected_conditions as EC

EXCLUDED_KEYWORDS = ["translate.g", "wikipedia.", ".wikipedia", "Mumbai", "Pune", "Bangalore", "shows/", "translate.google", ".pdf", ".docx", ".doc", ".jpeg", ".webp", ".rar", "dictionnaire", "dictionnaire.", "facebook.", "tikok.", "/download/", "/apt/", "apt/", ".txt", "amazon.", "adobe.", ".lingue", "-francais", "/traduction/", "/dictionary", "/traduction/", ".ebay", ".fnac", "/traduction/", "definitions", "/definition", "dictionary.", "twitch.", "encyclo", ".youtube", "?pdf", "pdf=", ".pptx", "?path", "path=", "/path", ".pps", "google.", ".google.", ".tiktok", "search.do?recordID", ".pensoft.net", ".virginialiving.", "/PDF/", "/object/", "PDF/", ".mnhn.fr", "gtgrecords.net", "komitid.fr", "/translate/", ".parismuseescollections."]

def waitBeforeClickOnXpath(driver, xPath):
    time.sleep(1)
    print("clicking on " + xPath + "...")
    button = driver.find_element(By.XPATH, xPath)
    driver.execute_script("arguments[0].click();", button)
    time.sleep(1)
    print("Continue the script")

   
def check_exists_by_xpath(driver, xpath):
    try:
        time.sleep(3)
        driver.find_element(By.XPATH, xpath)
        return 0
    except NoSuchElementException:
        return 1
    
def findATTR(driver, xpath, attr):
    try:
        value_attr = driver.find_element(By.XPATH, xpath)
        value_attr = value_attr.get_attribute(attr)
    except NoSuchElementException:
        value_attr = ''
        pass
    return str(value_attr)


def scrap_selenium_v1(init_url):
    
    # pip3 install seleniumbase
    from seleniumbase import Driver


    driver = Driver(
        uc=True,
        headless=False,          # run visible for debugging; set True in CI
        incognito=False,          # helps avoid cookie tracking
        no_sandbox=True,         # avoid sandbox issues in Docker/VMs
        block_images=False,       # faster loading (disable if you need images)
        disable_gpu=True,        # more stable in some environments
        page_load_strategy="eager",  # don't wait for all images/css
        undetectable=True        # maximize stealth
    )

    try:
        # Open Google first to warm up the driver
        initGoogle(driver)  # auto-handle captcha if shown

        waitloading(2, driver=driver)
        # Then go to your target URL
        driver.uc_open_with_reconnect(init_url, reconnect_time=6)
        driver.uc_gui_click_captcha()

        return driver

    except Exception as e:
        print(f" Driver init failed: {e}")
        driver.quit()
        return None
    


def initGoogle(driver):
    driver.get('https://www.google.com/')
    cookieGoogle = False
    waitloading(8, driver=driver)
    if check_exists_by_xpath(driver, '//body//div//div[contains(@role, "dialog")]//button[contains(@id, "L2AGLb")]') == 0:
        #cookieGoogle = driver.find_element(By.XPATH, '//body//div//div[contains(@role, "dialog")]//button[contains(@id, "L2AGLb")]').click()
        waitBeforeClickOnXpath(driver, '//body//div//div[contains(@role, "dialog")]//button[contains(@id, "L2AGLb")]')
    else:
        pass
    try:
        driver.find_element(By.CLASS_NAME, 'h-captcha')
    except NoSuchElementException:
        print("No captcha")

    if cookieGoogle:
        print("GOOGLE a changé l'id recupere le nouveau")
    else:
        print("Init Google...")
        
def waitloading(times, driver):
    times = int(times)
    time.sleep(times)
    wait = WebDriverWait(driver, times)
    wait.until(EC.presence_of_element_located((By.TAG_NAME, "body")))
    
def extract_list_from_google(driverinstance, title, result_expected,by_day=None):
    driverinstance.uc_open_with_reconnect('https://www.google.com/', reconnect_time=6)
    driverinstance.uc_gui_click_captcha()
    waitloading(4, driver=driverinstance)
    my_list = list()
    try:
        try:
            driverinstance.find_element(By.XPATH, '//textarea[contains(@maxlength, "2048")]').send_keys(title)
        except NoSuchElementException:
            driverinstance.find_element(By.XPATH, '//input[contains(@maxlength, "2048")]').send_keys(title)
        actions = ActionChains(driverinstance)
        actions.send_keys(Keys.ENTER)
        actions.perform()
        time.sleep(5)
        google_url = (driverinstance.current_url)
        if by_day:
            google_url = google_url.replace('search?q=', 'search?num=30&tbs=qdr:d&q=')
        else:
            google_url = google_url.replace('search?q=', 'search?num='+result_expected+'&q=')
        driverinstance.get(google_url)
        waitloading(4, driver=driverinstance)
        links = driverinstance.find_elements(By.XPATH,"//div[contains(@data-snhf, '0')]//a")
        to_delete = []
        for i in links:
            step1 = (i.get_attribute('href'))
            __parsed_uri = urlparse(step1)
            __result = '{uri.scheme}://{uri.netloc}/'.format(uri=__parsed_uri)
            __hostname = __result
            to_delete.append(step1)
            if any(keyword in str(step1) for keyword in EXCLUDED_KEYWORDS):
                pass
            else:
                my_list.append(step1)
    except Exception as e:
        print(f"-------- Failed get google ( crashed ) crash cause: {e}")
    return my_list
        