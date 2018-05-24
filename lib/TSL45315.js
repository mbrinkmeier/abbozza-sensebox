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
 * TSL45315 light sensor
 */

/**
 * The TSL45315 light sensor.
 * 
 * @type type
 */
Abbozza.SenseBoxTSL45315Device = {
    devtype: "SENSEBOX_TSL45315",
    init: function () {
        this.setHelpUrl(Abbozza.HELP_URL);
        this.setColour(ColorMgr.getColor("cat.SENSEBOX"));
        // this.appendValueInput("PIN")
        // this.appendDummyInput()
        //         .appendField(_("dev.DEVICE"));
        this.appendDummyInput()
                .appendField(new Blockly.FieldImage("img/devices/input32.png",16,16))
                .appendField(_("sb.TSL45315"))
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
        generator.addSetupCode("__TSL45315_" + name + ".begin();");
        var code = "TSL45315 __TSL45315_" + name + ";";
        generator.addInitCode(code);
        
        return "";
    },
    onDispose: function () {
        Abbozza.devices.delDevice(this.getName());
    }
};

Blockly.Blocks['sensebox_tsl45315_device'] = Abbozza.SenseBoxTSL45315Device;


/**
 * This blocks measures the humidity using the TSL45315 sensor
 * 
 * @type type
 */
Abbozza.SenseBoxTSL45315Brightness = {
init: function() {
    this.setHelpUrl(Abbozza.HELP_URL);
    this.setColour(ColorMgr.getColor("cat.SENSEBOX"));
    this.appendDummyInput()
    	.appendField(_("sb.TSL45315_BRIGHT"))
    	.appendField(new DeviceDropdown(this,"SENSEBOX_TSL45315"), "NAME");
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
        
        code = "__TSL45315_" + name + ".getLux()";

        return code;
  }
};

Blockly.Blocks['sensebox_tsl45315_brightness'] = Abbozza.SenseBoxTSL45315Brightness;



