#!/usr/bin/env python
# coding: utf-8

# In[ ]:


import requests
import time

import random

def generate_random_float(min_value, max_value):
    return round(random.uniform(min_value, max_value), 2)

def send_request(endpoint, method='GET', json=None, headers=None):
    if method.upper() == 'GET':
        response = requests.get(endpoint, json=data, headers=headers)
    elif method.upper() == 'POST':
        response = requests.post(endpoint, json=data, headers=headers)
    elif method.upper() == 'PUT':
        response = requests.put(endpoint, json=data, headers=headers)
    elif method.upper() == 'DELETE':
        response = requests.delete(endpoint, headers=headers)
    else:
        print('Invalid method')
        return

    if response.status_code == 200:
        print('Request was successful')
    else:
        print('Request failed with status code', response.status_code)
        print('Response body:', response.text)
    
    return response.json()

# specify the endpoint
endpoint = 'https://b03983789131-7345058576910038254.ngrok-free.app/gascompressor/status' #'http://localhost:8211/gascompressor/status'

# specify the headers (if any)
headers = {'Content-Type': 'application/json', 'accept': 'application/json'}


while True:
    # specify the data (if any)
    # generate a random float between 1.5 and 9.5
    temperature = str(generate_random_float(0, 50))
    pressure = str(generate_random_float(0, 7))
    flow = str(generate_random_float(0, 250))
    powerEnergy1 = str(generate_random_float(0, 12))
    powerEnergy2 = str(generate_random_float(0, 12))
    powerEnergy3 = str(generate_random_float(0, 12))
    
    data = {"temperature": temperature, "pressure": pressure, "flow": flow, "powerEnergy1": powerEnergy1, "powerEnergy2": powerEnergy2, "powerEnergy3": powerEnergy3}
    response = send_request(endpoint, 'POST', data, headers)
    print(response)
        
    time.sleep(1)  # wait for 5 seconds


# In[ ]:




