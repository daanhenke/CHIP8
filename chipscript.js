/**
 * Created by daan on 6/29/2016.
 * */

opcodes = {
    0x0: "handle0",
    0x1: "JP",
    0x2: "CALL",
    0x3: "error",
    0x4: "error",
    0x5: "error",
    0x6: "error",
    0x7: "error",
    0x8: "error",
    0x9: "error",
    0xA: "error",
    0xB: "error",
    0xC: "error",
    0xD: "error",
    0xE: "error",
    0xF: "error"
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
            0xF0, 0x90, 0xF0, 0x90, 0xF0,   //8
            0xF0, 0x90, 0xF0, 0x10, 0xF0,   //9
            0xF0, 0x90, 0xF0, 0x90, 0x90,   //A
            0xE0, 0x90, 0xE0, 0x90, 0xE0,   //B
            0xF0, 0x80, 0x80, 0x80, 0xF0,   //C
            0xE0, 0x90, 0x90, 0x90, 0xE0,   //D
            0xF0, 0x80, 0xF0, 0x80, 0xF0,   //E
            0xF0, 0x80, 0xF0, 0x80, 0x80,   //F
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
    },

    opcode: function () {
        //Get 16 bit opcode from memory
        var opcode = (this.memory[this.PC] << 8) + (this.memory[this.PC + 1]);

        //Get all possible variables inside opcode because I'm lazy as fuck and don't wanna type that 50 times
        var nnn = opcode & 0x0FFF;
        var n = opcode & 0x000F;
        var x = opcode & 0x0F00 >> 8;
        var y = opcode & 0x00F0 >> 4;

        //Get opcode ID (first 4 bits)
        var opid = (opcode & 0xF000) >> 12;

        console.log(opid);

        //Lookup opcode ID in the opcode lookup table and execute the corresponding function
        this[opcodes[opid]](nnn, n, x, y);


    },

    //What do you think...
    error: function (nnn, n, x, y) {
        alert("Unknown / Unimplemented opcode.")
    },

    //0Handler, 0x*** has more than one opcode so we need something to find the right one
    handle0: function (nnn, n, x, y) {
        //Use n to identify the right opcode, cheeky breeky life hack
        switch(n)
        {
            case 0x0:
                this.error();
                break;

            case 0xE:
                this.RET(nnn, n, x, y);
                break;
        }
    },

    //JP nnn, jumps to location nnn
    JP: function (nnn) {
        this.PC = nnn;
    },

    //CALL nnn, calls nnn as subroutine (pushes current PC to stack etc etc)
    /*
    * PLEASE
    * PLEASE DAAN DONT BE A NEWFAG AND FORGET TO CHANGE 8 AND 16 BIT INTEGERS TO THEIR OWN DATA TYPE BECUZ OVERFLOWS WONT WORK OTHERWISE
    * PLEASE
    */
    CALL: function (nnn) {
        this.Stack[this.SP] = this.PC;
        this.SP++;
        this.PC = nnn;
    },

    //RET, sets PC to the address in the stack on SP - 1, why SP - 1? because laziness
    RET: function () {
        this.PC = this.Stack[this.SP - 1] + 2;
        this.SP -= 1;
    }
};