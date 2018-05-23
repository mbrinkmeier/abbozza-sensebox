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
 * BMP280 Pressure sensor
 */

/**
 * The BMP280 Pressure sensor.
 * 
 * @type type
 */
Abbozza.SenseBoxBMP280Device = {
    devtype: "SENSEBOX_BMP280",
    init: function () {
        this.setHelpUrl(Abbozza.HELP_URL);
        this.setColour(ColorMgr.getColor("cat.SENSEBOX"));
        // this.appendValueInput("PIN")
        // this.appendDummyInput()
        //         .appendField(_("dev.DEVICE"));
        this.appendDummyInput()
                .appendField(new Blockly.FieldImage("img/devices/input32.png",16,16))
                .appendField(_("sb.BMP280"))
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
        generator.addSetupCode("__BMP280_" + this.getName() + ".begin();");
        var code = "BMP280 __BMP280_" + this.getName() + ";";
        generator.addInitCode(code);
        
        return "";
    },
    onDispose: function () {
        Abbozza.devices.delDevice(this.getName());
    }
};

Blockly.Blocks['sensebox_bmp280_device'] = Abbozza.SenseBoxBMP280Device;


/**
 * This blocks measures pressure
 * 
 * @type type
 */
 Abbozza.SenseBoxBMP280Pressure = {
init: function() {
    this.setHelpUrl(Abbozza.HELP_URL);
    this.setColour(ColorMgr.getColor("cat.SENSEBOX"));
    this.appendDummyInput()
    	.appendField(_("sb.BMP280_PRESSURE"))
    	.appendField(new DeviceDropdown(this,"SENSEBOX_BMP280"), "NAME");
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

        code = "__BMP280_" + device.getName() + ".getPressure()";

        return code;
  }
};

Blockly.Blocks['sensebox_bmp280_pressure'] = Abbozza.SenseBoxBMP280Pressure;

