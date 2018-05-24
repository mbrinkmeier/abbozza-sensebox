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
 * VEML6070 UV sensor
 */

/**
 * The TVEML6070 UV sensor.
 * 
 * @type type
 */
Abbozza.SenseBoxVEML6070Device = {
    devtype: "SENSEBOX_VEML6070",
    init: function () {
        this.setHelpUrl(Abbozza.HELP_URL);
        this.setColour(ColorMgr.getColor("cat.SENSEBOX"));
        // this.appendValueInput("PIN")
        // this.appendDummyInput()
        //         .appendField(_("dev.DEVICE"));
        this.appendDummyInput()
                .appendField(new Blockly.FieldImage("img/devices/input32.png",16,16))
                .appendField(_("sb.VEML6070"))
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
        var name = generator.fieldToCode(this,"NAME");
        generator.addLibrary("SenseBox.h");
        generator.addSetupCode("__VEML6070_" + name + ".begin();");
        var code = "VEML6070 __VEML6070_" + name + ";";
        generator.addInitCode(code);
        
        return "";
    },
    onDispose: function () {
        Abbozza.devices.delDevice(this.getName());
    }
};

Blockly.Blocks['sensebox_veml6070_device'] = Abbozza.SenseBoxVEML6070Device;


/**
 * This blocks measures uv level
 * 
 * @type type
 */
Abbozza.SenseBoxVEML6070UV = {
init: function() {
    this.setHelpUrl(Abbozza.HELP_URL);
    this.setColour(ColorMgr.getColor("cat.SENSEBOX"));
    this.appendDummyInput()
    	.appendField(_("sb.VEML6070_UV"))
    	.appendField(new DeviceDropdown(this,"SENSEBOX_VEML6070"), "NAME");
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
        
        var name = generator.fieldToCode(this,"NAME");
        
        code = "__VEML6070_" + name + ".getUV()";

        return code;
  }
};

Blockly.Blocks['sensebox_veml6070_uv'] = Abbozza.SenseBoxVEML6070UV;



