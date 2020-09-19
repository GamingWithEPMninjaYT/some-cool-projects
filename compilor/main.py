list_code = {"a": "46b", "b": "91z", "c": "09z", "d": "65m", "e": "29d", "f": "74n", "g": "97n", "h": "10a", "i": "54h", "j": "34a", "k": "91j", "l": "97j", "m": "67h", "n": "49n", "o": "45k", "p": "01a", "q": "87r", "r": "54v", "s": "09w", "t": "76h", "u": "65v", "v": "23a", "w": "70x", "x": "65k", "y": "99z", "z":"00a", "’": "88u", "â": "47b", " ": "44q", ".": "55p", ",": "12v", "'": "87g", "`": "08t"}
run = True
table = []
while run:
    mode = input(">")
    if mode == "encode":
        entry = input("Enter a text to compile in .Zed [Base BETA] ")
        entry = entry.lower()
        try:
            for letters in entry:
                find = list_code[letters]
                table.append(find)
           
            print("-".join(table))
        except KeyError:
            print("It doesn't exist.")
        table = []
    elif mode == "stop":
        run = False
    elif mode == "help":
        print("> Here are the commands :\n\encode [args] |\n\decode [args] |\n\thelp [none]")
    elif mode == "decode":
        list_code = {"a": "46b", "b": "91z", "c": "09z", "d": "65m", "e": "29d", "f": "74n", "g": "97n", "h": "10a", "i": "54h", "j": "34a", "k": "91j", "l": "97j", "m": "67h", "n": "49n", "o": "45k", "p": "01a", "q": "87r", "r": "54v", "s": "09w", "t": "76h", "u": "65v", "v": "23a", "w": "70x", "x": "65k", "y": "99z", "z":"00a", "’": "88u", "â": "47b", " ": "44q", ".": "55p", ",": "12v", "'": "87g", "`": "08t"}
        entry = input("Enter the .Zed [Base BETA] code ")
        entry = entry.split("-")
        try:
            for keys in entry:
               
                table.append(list(list_code.keys())[list(list_code.values()).index(keys)])
            print("".join(table))
            table = []
        except ValueError:
            print("The key isn't in the list.")
               
    else:
        print("Nothing to show")
