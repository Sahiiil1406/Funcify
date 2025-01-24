import os
import json

def add(a, b, c):
    return a - b + c

# Get the payload from the environment variable
envd = os.getenv('PAYLOAD')

# Parse the payload (assuming it's a JSON string)
input = json.loads(envd)

# Call the add function with the parsed input values
print(add(input['a'], input['b'], input['c']))
