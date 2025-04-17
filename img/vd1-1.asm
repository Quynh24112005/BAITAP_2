; 8086 Assembly Program to evaluate f(x) = ax^3 - bx^2 - cx + d and print the result
.MODEL SMALL
.STACK 100H

.DATA
    ; Define coefficients and root using DB
    a      DB 4     ; Coefficient a = 4
    b      DB 3     ; Coefficient b = 3
    c      DB 2     ; Coefficient c = 2
    d      DB 1     ; Coefficient d = 1
    x      DB 0     ; Root x = 1 (f(1) should be 0)
    result DB 0     ; To store the result of f(x)
    msg    DB 'f(x) = $'  ; Message to print before the result

.CODE
MAIN PROC
    MOV AX, @DATA    ; Initialize data segment
    MOV DS, AX

    ; Horner's method: f(x) = ((ax - b)x - c)x + d
    ; Use 8-bit registers to ensure 8-bit operations
    ; Step 1: t = a * x
    MOV AL, a        ; AL = a (4)
    MOV BL, x        ; BL = x (1)
    MUL BL           ; AL = a * x (4 * 1 = 4)
    MOV CL, AL       ; CL = t = 4

    ; Step 2: t = t - b
    SUB CL, b        ; CL = t - b (4 - 3 = 1)

    ; Step 3: t = t * x
    MOV AL, CL       ; AL = t (1)
    MUL BL           ; AL = t * x (1 * 1 = 1)
    MOV CL, AL       ; CL = t = 1

    ; Step 4: t = t - c
    SUB CL, c        ; CL = t - c (1 - 2 = -1, or 255 in unsigned 8-bit)

    ; Step 5: t = t * x
    MOV AL, CL       ; AL = t (-1)
    MUL BL           ; AL = t * x (-1 * 1 = -1, or 255 in unsigned 8-bit)
    MOV CL, AL       ; CL = t = -1

    ; Step 6: t = t + d
    ADD CL, d        ; CL = t + d (-1 + 1 = 0)

    ; Store the result
    MOV result, CL   ; Store f(x) in result (should be 0)

    ; Print the message "f(x) = "
    MOV AH, 09H      ; DOS function to print a string
    LEA DX, msg      ; Load address of message
    INT 21H          ; Print "f(x) = "

    ; Simplified printing of the result
    MOV AL, result   ; Load the result into AL
    CMP AL, 0
    JGE PRINT_POS    ; If AL >= 0, print as is
    ; Handle negative number
    MOV AH, 02H      ; DOS function to print a character
    MOV DL, '-'      ; Print minus sign
    INT 21H
    NEG AL           ; Negate AL to make it positive

PRINT_POS:
    ; Convert the number in AL to ASCII and print
    MOV AH, 0        ; Clear AH
    MOV BL, 10       ; Divisor for decimal conversion
    MOV CX, 0        ; Counter for digits

CONVERT_LOOP:
    MOV AH, 0        ; Clear AH for division
    DIV BL           ; AL / 10, quotient in AL, remainder in AH
    MOV DL, AH       ; Store remainder
    PUSH DX          ; Push remainder to stack
    INC CX           ; Increment digit counter
    CMP AL, 0        ; Check if quotient is 0
    JNE CONVERT_LOOP ; If not, continue

PRINT_LOOP:
    POP DX           ; Pop digit (remainder)
    ADD DL, '0'      ; Convert to ASCII
    MOV AH, 02H      ; DOS function to print a character
    INT 21H          ; Print the digit
    LOOP PRINT_LOOP  ; Repeat for all digits

    ; Print a newline
    MOV AH, 02H
    MOV DL, 0DH      ; Carriage return
    INT 21H
    MOV DL, 0AH      ; Line feed
    INT 21H

    ; Exit program
    MOV AH, 4CH
    INT 21H

MAIN ENDP
END MAIN