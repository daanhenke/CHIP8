/**
 * Created by daan on 6/29/2016.
 */

opcodes = {
    
};

chipito = {
    //The CHIP8 has 0xFFF bytes of memory (DEC 4,095 bytes)
    memory: new Array(0xFFF),

    //Basic FONT for characters 0 - 9 and A - F
    font:   [0xF0, 0x90, 0x90, 0x90, 0xF0,  //0
            0x20, 0x60, 0x20, 0x20, 0x70,   //1
            0xF0, 0x10, 0xF0, 0x80, 0xF0,   //2
            0xF0, 0x10, 0xF0, 0x10, 0xF0,   //3
            0x90, 0x90, 0xF0, 0x10, 0x10,   //4
            0xF0, 0x80, 0xF0, 0x10, 0xF0,   //5
            0xF0, 0x80, 0xF0, 0x90, 0xF0,   //6
            0xF0, 0x10, 0x20, 0x40, 0x40,   //7
    ],

    //8 Bit registers V0 - VF
    registers: new Array(0xF),

    //16 Bit register I
    I: 0x0,

    //2 Timers, they decrement 1 per tick (60 Hz) if they are not equal to 0
    tDelay: 0x0,
    tSound: 0x0,

    //16 Bit Program Counter
    PC: 0x200,

    //A stack that can hold 16 16 Bit addresses
    Stack: new Array(0xF),

    //8 Bit Stack Pointer, to point to the current address in the stack
    SP: 0x0,

    //Keyboard with characters 0-F
    keyboard: new Array(0xF),
    
    //Screen (64 pixels wide, 32 pixels high) stored outside of memory because it would'nt be useful inside memory
    screen: new Array(64 * 32),
    
    clear: function () {
        for(var i = 0; i < this.memory.length; i++)
        {
            this.memory[i] = 0x0;
        }
        for(i = 0; i < this.font.length; i++)
        {
            this.memory[i] = this.font[i];
        }
    }
};