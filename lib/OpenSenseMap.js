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
 * OpenSenseMap blocks
 */

/**
 * The OpenSenseMap Ethernet connection
 * 
 * @type type
 */
Abbozza.SenseBoxMapEthernet = {
    devtype: "SENSEBOX_MAP",
    init: function () {
        this.setHelpUrl(Abbozza.HELP_URL);
        this.setColour(ColorMgr.getColor("cat.SENSEBOX"));
        // this.appendValueInput("PIN")
        // this.appendDummyInput()
        //         .appendField(_("dev.DEVICE"));
        this.appendDummyInput()
                .appendField(new Blockly.FieldImage("img/devices/input32.png",16,16))
                .appendField(__("sb.MAP_ETHER",0))
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
        generator.addSetupCode("__OpenSenseMap_" + name + ".beginEthernet();");
        var code = "OpenSenseMap __OpenSenseMap_" + name + "(\"" + name + "\");";
        generator.addInitCode(code);
        
        return "";
    },
    onDispose: function () {
        Abbozza.devices.delDevice(this.getName());
    }
};

Blockly.Blocks['sensebox_map_ethernet'] = Abbozza.SenseBoxMapEthernet;


/**
 * The OpenSenseMap Ethernet connection
 * 
 * @type type
 */
Abbozza.SenseBoxMapWiFi = {
    devtype: "SENSEBOX_MAP",
    init: function () {
        this.setHelpUrl(Abbozza.HELP_URL);
        this.setColour(ColorMgr.getColor("cat.SENSEBOX"));
        // this.appendValueInput("PIN")
        // this.appendDummyInput()
        //         .appendField(_("dev.DEVICE"));
        this.appendDummyInput()
                .appendField(new Blockly.FieldImage("img/devices/input32.png",16,16))
                .appendField(__("sb.MAP_WIFI",0))
                .appendField(new FieldDevNameInput("<default>", Abbozza.blockDevices, this), "NAME");
        this.appendDummyInput()
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(__("sb.MAP_WIFI",1))
                .appendField(new Blockly.FieldTextInput("SSID"),"SSID");
        this.appendDummyInput()
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(__("sb.MAP_WIFI",2))
                .appendField(new Blockly.FieldTextInput("PWD"),"PWD");
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
        var id = generator.fieldToCode(this,"SSID");
        var pwd = generator.fieldToCode(this,"PWD");
        generator.addSetupCode("__OpenSenseMap_" + name + ".beginWiFi(\"" + id + "\",\"" + pwd + "\");");
        var code = "OpenSenseMap __OpenSenseMap_" + name + "(\"" + name + "\");";
        generator.addInitCode(code);
        
        return "";
    },
    onDispose: function () {
        Abbozza.devices.delDevice(this.getName());
    }
};

Blockly.Blocks['sensebox_map_wifi'] = Abbozza.SenseBoxMapWiFi;


/**
 * This blocks measures pressure
 * 
 * @type type
 */
 Abbozza.SenseBoxMapSend = {
init: function() {
    this.setHelpUrl(Abbozza.HELP_URL);
    this.setColour(ColorMgr.getColor("cat.SENSEBOX"));
    this.appendValueInput("VALUE")
    	.appendField(__("sb.MAP_SEND",0))
    	.appendField(new DeviceDropdown(this,"SENSEBOX_MAP"), "NAME")
    	.appendField(__("sb.MAP_SEND",1))
        .appendField(new Blockly.FieldTextInput("ID"),"ID")
    	.appendField(__("sb.MAP_SEND",2))
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
        var id = generator.fieldToCode(this,"ID");
        var value = generator.valueToCode(this,"VALUE");
        
        code = "__OpenSenseMap_" + name + ".uploadValue(" + value + ",\"" + id + "\");";

        return code;
  }
};

Blockly.Blocks['sensebox_map_send'] = Abbozza.SenseBoxMapSend;

