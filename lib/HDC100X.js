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
 * HDC1000 Humidity and temperature sensor
 */

/**
 * The HDC1000 device block.
 * 
 * It requres two digital pins:
 * A pin for the echo signal and an trigger pin.
 * 
 * @type type
 */
Abbozza.SenseBoxHDC100XDevice = {
    devtype: "SENSEBOX_HDC100X",
    init: function () {
        this.setHelpUrl(Abbozza.HELP_URL);
        this.setColour(ColorMgr.getColor("cat.SENSEBOX"));
        // this.appendValueInput("PIN")
        // this.appendDummyInput()
        //         .appendField(_("dev.DEVICE"));
        this.appendDummyInput()
                .appendField(new Blockly.FieldImage("img/devices/input32.png",16,16))
                .appendField(_("sb.HDC100X"))
                .appendField(new FieldDevNameInput("<default>", Abbozza.blockDevices, this), "NAME");
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
        generator.addLibrary("SenseBox.h");
        generator.addSetupCode("__HDC100X_" + this.getName() + ".begin();");
        var code = "HDC100X __HDC100X_" + this.getName() + ";";
        generator.addInitCode(code);
        
        return "";
    },
    onDispose: function () {
        Abbozza.devices.delDevice(this.getName());
    }
};

Blockly.Blocks['sensebox_hdc100x_device'] = Abbozza.SenseBoxHDC100XDevice;


/**
 * This blocks measures the humidity using the HDC100X sensor
 * 
 * @type type
 */
Abbozza.SenseBoxHDC100XHumidity = {
init: function() {
    this.setHelpUrl(Abbozza.HELP_URL);
    this.setColour(ColorMgr.getColor("cat.SENSEBOX"));
    this.appendDummyInput()
    	.appendField(_("sb.HDC100X_HUM"))
    	.appendField(new DeviceDropdown(this,"SENSEBOX_HDC100X"), "NAME");
    this.setInputsInline(false);
    this.setOutput(true,"DECIMAL");
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

        code = "__HDC100X_" + device.getName() + ".getHumi()";

        return code;
  }
};

Blockly.Blocks['sensebox_hdc100x_humidity'] = Abbozza.SenseBoxHDC100XHumidity;

/**
 * This blocks measures the temperature using the HDC100X sensor
 * 
 * @type type
 */
Abbozza.SenseBoxHDC100XTemperature = {
init: function() {
    this.setHelpUrl(Abbozza.HELP_URL);
    this.setColour(ColorMgr.getColor("cat.SENSEBOX"));
    this.appendDummyInput()
    	.appendField(_("sb.HDC100X_TEMP"))
    	.appendField(new DeviceDropdown(this,"SENSEBOX_HDC100X"), "NAME");
    this.setInputsInline(false);
    this.setOutput(true,"DECIMAL");
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

        code = "__HDC100X_" + device.getName() + ".getTemp()";

        return code;
  }
};

Blockly.Blocks['sensebox_hdc100x_temperature'] = Abbozza.SenseBoxHDC100XTemperature;



