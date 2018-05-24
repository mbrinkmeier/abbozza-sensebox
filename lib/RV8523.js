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
 * V8523 Realtime clock
 */

/**
 * The V8523 Realtime clock
 * 
 * @type type
 */
Abbozza.SenseBoxRV8523Device = {
    devtype: "SENSEBOX_RV8523",
    init: function () {
        this.setHelpUrl(Abbozza.HELP_URL);
        this.setColour(ColorMgr.getColor("cat.SENSEBOX"));
        // this.appendValueInput("PIN")
        // this.appendDummyInput()
        //         .appendField(_("dev.DEVICE"));
        this.appendDummyInput()
                .appendField(new Blockly.FieldImage("img/devices/input32.png",16,16))
                .appendField(_("sb.RV8523"))
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
        generator.addSetupCode("__RV8523_" + name + ".begin();");
        generator.addSetupCode("__RV8523_" + name + ".setTime(__DATE__,__TIME__);");
        var code = "RV8523 __RV8523_" + name + ";";
        generator.addInitCode(code);
        
        return "";
    },
    onDispose: function () {
        Abbozza.devices.delDevice(this.getName());
    }
};

Blockly.Blocks['sensebox_rv8523_device'] = Abbozza.SenseBoxRV8523Device;

/**
 * Get the time
 */
Abbozza.SenseBoxRV8523Get = {
init: function() {
    this.setHelpUrl(Abbozza.HELP_URL);
    this.setColour(ColorMgr.getColor("cat.SENSEBOX"));
    this.appendDummyInput()
    	.appendField(new DeviceDropdown(this,"SENSEBOX_RV8523"), "NAME")
    	.appendField(new Blockly.FieldDropdown([
            [_("sb.RV8523_YEAR"),"getYear"],
            [_("sb.RV8523_MONTH"),"getMonth"],
            [_("sb.RV8523_DAY"),"getDay"],
            [_("sb.RV8523_HOUR"),"getHour"],
            [_("sb.RV8523_MIN"),"getMin"],
            [_("sb.RV8523_SEC"),"getSec"]
        ]), "CHOICE");
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
        var choice = this.getFieldValue("CHOICE");
        
        code = "__RV8523_" + name + "." + choice + "()";

        return code;
  }
};

Blockly.Blocks['sensebox_rv8523_get'] = Abbozza.SenseBoxRV8523Get;

/**
 * Get the time
 */
Abbozza.SenseBoxRV8523Set = {
init: function() {
    this.setHelpUrl(Abbozza.HELP_URL);
    this.setColour(ColorMgr.getColor("cat.SENSEBOX"));
    this.appendDummyInput()
    	.appendField(new DeviceDropdown(this,"SENSEBOX_RV8523"), "NAME")
        .appendField(_("sb.RV8523_SET"));
    this.appendValueInput("YEAR")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(_("sb.RV8523_YEAR"))
        .setCheck("NUMBER");
    this.appendValueInput("MONTH")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(_("sb.RV8523_MONTH"))
        .setCheck("NUMBER");
    this.appendValueInput("DAY")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(_("sb.RV8523_DAY"))
        .setCheck("NUMBER");
    this.appendValueInput("HOUR")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(_("sb.RV8523_HOUR"))
        .setCheck("NUMBER");
    this.appendValueInput("MIN")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(_("sb.RV8523_MIN"))
        .setCheck("NUMBER");
    this.appendValueInput("SEC")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(_("sb.RV8523_SEC"))
        .setCheck("NUMBER");
    this.setInputsInline(false);
    this.setOutput(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
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
        var year = generator.valueToCode(this,"YEAR");
        var month = generator.valueToCode(this,"MONTH");
        var day = generator.valueToCode(this,"DAY");
        var hour = generator.valueToCode(this,"HOUR");
        var min = generator.valueToCode(this,"MIN");
        var sec = generator.valueToCode(this,"SEC");
        
        var code = sec + "," + min + "," + hour + "," + day + "," + month + "," + year;
        code = "__RV8523_" + name + ".set(" + code + ");";

        return code;
  }
};

Blockly.Blocks['sensebox_rv8523_set'] = Abbozza.SenseBoxRV8523Set;
