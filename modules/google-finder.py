

from modules.functions import extract_list_from_google, scrap_selenium_v1


driver = scrap_selenium_v1("google.com")

try:
    list_link = extract_list_from_google(driver, "" , 4000, True)
except Exception:
    pass