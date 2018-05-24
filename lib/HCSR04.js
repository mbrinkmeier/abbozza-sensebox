/**
 * @license
 * abbozza!
 *
 * Copyright 2018 Michael Brinkmeier ( michael.brinkmeier@uni-osnabrueck.de )
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 
/**
 * @fileoverview Blocks for the senseBox:edu
 * 
 * @author michael.brinkmeier@uni-osnabrueck.de (Michael Brinkmeier)
 */

/**
 * The ultrasonic distance sensor HC-SRO4
 * 
 * Two blocks are provided:
 * 1) The device block setting data and trigger pin
 * 2) The data reading block
 */

/**
 * The HC-SR04 device block.
 * 
 * It requres two digital pins:
 * A pin for the echo signal and an trigger pin.
 * 
 * @type type
 */
Abbozza.SenseBoxUSDevice = {
    devtype: "SENSEBOX_US_DISTANCE",
    init: function () {
        this.setHelpUrl(Abbozza.HELP_URL);
        this.setColour(ColorMgr.getColor("cat.SENSEBOX"));
        // this.appendValueInput("PIN")
        // this.appendDummyInput()
        //         .appendField(_("dev.DEVICE"));
        this.appendDummyInput()
                .appendField(new Blockly.FieldImage("img/devices/input32.png",16,16))
                .appendField(__("sb.US_DIST",0))
                .appendField(new FieldDevNameInput("<default>", Abbozza.blockDevices, this), "NAME");
        this.appendDummyInput()
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(__("sb.US_DIST",1))
                .appendField(new PinDropdown(PinDropdown.DIGITAL), "TRIGGER");
        this.appendDummyInput()
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(__("sb.US_DIST",2))
                .appendField(new PinDropdown(PinDropdown.DIGITAL), "ECHO");
        // .appendField(new Blockly.FieldDropdown( function() { return Abbozza.board.getPWMPinMenu(); }  ), "PIN");
        // .setCheck("NUMBER");
        this.setInputsInline(false);
        this.setOutput(false);
        this.setPreviousStatement(true, "DEVICE");
        this.setNextStatement(true, "DEVICE");
        this.setTooltip('');
        Abbozza.addDisposeHandler(this);
    },
    
    getName: function () {
        return this.getFieldValue("NAME");
    },
    
    generateCode: function (generator) {
        var name = generator.fieldToCode(this,"NAME");        
        generator.addLibrary("SenseBox.h");
        var data = generator.fieldToCode(this,"ECHO");
        var trigger = generator.fieldToCode(this,"TRIGGER");
        var code = "Ultrasonic __US_" + name + "(" + trigger + "," + data + ");";
        generator.addInitCode(code);
        
        return "";
    },
    onDispose: function () {
        Abbozza.devices.delDevice(this.getName());
    }
};

Blockly.Blocks['sensebox_us_device'] = Abbozza.SenseBoxUSDevice;

/**
 * This blocks measures the distance using the given Ultrasonic distance 
 * sensor
 * 
 * @type type
 */
Abbozza.SenseBoxUSRead = {
init: function() {
    this.setHelpUrl(Abbozza.HELP_URL);
    this.setColour(ColorMgr.getColor("cat.SENSEBOX"));
    this.appendDummyInput()
    	.appendField(_("sb.US_READ"))
    	.appendField(new DeviceDropdown(this,"SENSEBOX_US_DISTANCE"), "NAME");
    this.setInputsInline(false);
    this.setOutput(true,"NUMBER");
	 this.setPreviousStatement(false);
	 this.setNextStatement(false);
    this.setTooltip('');
  },
 
  setName : function(name) {
  	this.name = name;
  },
  
  generateCode: function(generator) {
  	var device = Abbozza.blockDevices.getDevice(generator.fieldToCode(this,"NAME"));
  	
 	if ( device == null ) {
            ErrorMgr.addError(this,_("err.UNKNOWN_DEVICE"));
            return;
        }

        var name = generator.fieldToCode(device,"NAME");
        code = "__US_" + name + ".getDistance()";

        return code;
  }
};

Blockly.Blocks['sensebox_us_read'] = Abbozza.SenseBoxUSRead;
