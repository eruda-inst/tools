import sys
import random
import string

def generate_password(length, include_uppercase, include_numbers, include_special):
    characters = string.ascii_lowercase
    if include_uppercase:
        characters += string.ascii_uppercase
    if include_numbers:
        characters += string.digits
    if include_special:
        characters += string.punctuation

    password = ''.join(random.choice(characters) for i in range(length))
    return password

if __name__ == "__main__":
    length = int(sys.argv[1])
    include_uppercase = sys.argv[2].lower() == 'true'
    include_numbers = sys.argv[3].lower() == 'true'
    include_special = sys.argv[4].lower() == 'true'

    print(generate_password(length, include_uppercase, include_numbers, include_special))
