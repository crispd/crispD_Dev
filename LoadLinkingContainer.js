importPackage(Packages.org.csstudio.opibuilder.scriptUtil);

var device = PVUtil.getString(pvArray[0]);
var opiPath = display.getModel().getOpiFilePath().toString();
var filePath = opiPath.substring(0, opiPath.lastIndexOf("/"))+"/BSS_templates/"+device+".xml";

try {
  //root is a JDOM Element
  var root = FileUtil.loadXMLFile(filePath, widget);

  var groups = root.getChildren();

  widget.removeAllChildren();
  try {
	var linkingContainer = WidgetUtil.createWidgetModel("org.csstudio.opibuilder.widgets.linkingContainer");	
	linkingContainer.setPropertyValue("opi_file", "BSS_templates/device_templates/"+device+"_header.opi");
	linkingContainer.setPropertyValue("auto_size", true);
	linkingContainer.setPropertyValue("zoom_to_fit", false);
	linkingContainer.setPropertyValue("border_style", 0);
	widget.addChildToBottom(linkingContainer);
  }
  catch (e) {

  }
  for(var i=0; i<groups.size(); i++){
	
	//create linking container
	var linkingContainer = WidgetUtil.createWidgetModel("org.csstudio.opibuilder.widgets.linkingContainer");	
	linkingContainer.setPropertyValue("opi_file", "BSS_templates/device_templates/"+device+".opi");
	linkingContainer.setPropertyValue("auto_size", true);
	linkingContainer.setPropertyValue("zoom_to_fit", false);
	linkingContainer.setPropertyValue("border_style", 0);
	
	//add macros
	linkingContainer.addMacro("index", i);
	var macros = groups.get(i).getChildren();
	for(var j=0; j<macros.size(); j++){
		var macro = macros.get(j);
		linkingContainer.addMacro(macro.getName(), macro.getValue());
	}	
	
	//add linking container to widget
	widget.addChildToBottom(linkingContainer);
	
  }
}
catch (e) {

}

