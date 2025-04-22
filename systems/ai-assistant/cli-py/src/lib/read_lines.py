def read_lines(placeholder: str = ""):
    lines = []
    while True:
        try:
            line = input(placeholder if len(lines) == 0 else ">>> ")
            if line == "EOF":
                raise EOFError()
            lines.append(line)
        except EOFError:
            break
    return "\n".join(lines).strip()
