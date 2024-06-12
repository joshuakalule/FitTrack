import re

# Assuming the output of the grep command is stored in a file named 'grep_output.txt'
with open('grep_list.txt', 'r') as file:
    print("| Endpoint | File |")
    print("|", "-"*32, "|", "-"*20, "|")
    for line in file:
        # Extract all characters from the beginning of the line to ':@'
        group1 = re.search("^\./(.*?):", line)
        # Extract all characters between "route(" and "' "
        group2 = re.search("route\((.*?),", line)
        # Concatenate the groups if they are found
        if group1 and group2:
            # result = group1.group(1) + group2.group(1)
            endpoint = group2.group(1).replace("'", '')
            file_path = group1.group(1)
            file_name = file_path.split('/')[-1]
            result = f"| `api/v1{endpoint}` | [{file_name}]({file_path}) |"
            print(result)

