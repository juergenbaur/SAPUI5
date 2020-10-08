sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.drag-and-drop.drag-and-drop.controller.Main", {
		onInit: function () {
			// Just put some bare-bones data in a moveable model
			var authorsModel = new sap.ui.model.json.JSONModel();
			authorsModel.setData({
				AvailableAuthors: [{
					Name: "Denise Nepraunig",
					SkillLevel: "Sorceress"
				}, {
					Name: "Christiane Goebels",
					SkillLevel: "Ninja"
				}, {
					Name: "Thilo Seidel",
					SkillLevel: "Wizard"
				}, {
					Name: "Paul Modderman",
					SkillLevel: "Junior Hacker"
				}],
				ChosenAuthors: []
			});
			this.getView().setModel(authorsModel);
		},

		onDragStart: function (oEvent) {
			var oDraggedRow = oEvent.getParameter("target");
			var oDragSession = oEvent.getParameter("dragSession");

			// keep the dragged row context for the drop action
			oDragSession.setComplexData("draggedRowContext", oDraggedRow.getBindingContext());
		},
		
		onDropAvailableTable: function(oEvent) {
			var oDragSession = oEvent.getParameter("dragSession");
			var oDraggedRowContext = oDragSession.getComplexData("draggedRowContext");
			if (!oDraggedRowContext) {
				return;
			}
			
			var oModel = this.getView().getModel();
			var draggedData = oModel.getProperty(oDraggedRowContext.sPath);
			
			// Removed the dragged item from source model, add to destination model
			var draggedIndex = oDraggedRowContext.sPath.split("/")[2];
			oModel.getData().AvailableAuthors.push(draggedData);
			oModel.getData().ChosenAuthors.splice(draggedIndex, 1);
			oModel.refresh(true);
		},

		onDropChosenTable: function(oEvent) {
			var oDragSession = oEvent.getParameter("dragSession");
			var oDraggedRowContext = oDragSession.getComplexData("draggedRowContext");
			if (!oDraggedRowContext) {
				return;
			}
			
			var oModel = this.getView().getModel();
			var draggedData = oModel.getProperty(oDraggedRowContext.sPath);
			
			// Removed the dragged item from source model, add to destination model
			var draggedIndex = oDraggedRowContext.sPath.split("/")[2];
			oModel.getData().ChosenAuthors.push(draggedData);
			oModel.getData().AvailableAuthors.splice(draggedIndex, 1);
			oModel.refresh(true);
		}
	});
});