$(document).ready(function(){$("#basic-dl-form").submit(function(){return alert($("#basic-dl").val()),!1}),$("#basic-dl").bootstrapDualListbox(),$("#pre-selected-dl-form").submit(function(){return alert($("#pre-selected-dl").val()),!1}),$("#pre-selected-dl").bootstrapDualListbox(),$("#disabled-attribute-dl-form").submit(function(){return alert($("#disabled-attribute-dl").val()),!1}),$("#disabled-attribute-dl").bootstrapDualListbox(),$("#filtered-results-dl-form").submit(function(){return alert($("#filtered-results-dl").val()),!1}),$("#filtered-results-dl").bootstrapDualListbox({nonSelectedListLabel:"Non-selected",selectedListLabel:"Selected",preserveSelectionOnMove:"moved",moveOnSelect:!1,nonSelectedFilter:"HTML5|Java|Visual Basic|Python"}),$("#basic-ms").multiSelect(),$("#pre-selected-ms").multiSelect(),$("#callbacks-ms").multiSelect({afterSelect:function(e){alert("Select value: "+e)},afterDeselect:function(e){alert("Deselect value: "+e)}}),$("#keep-order-ms").multiSelect({keepOrder:!0}),$("#public-methods-ms").multiSelect(),$("#select-all").click(function(){return $("#public-methods-ms").multiSelect("select_all"),!1}),$("#deselect-all").click(function(){return $("#public-methods-ms").multiSelect("deselect_all"),!1}),$("#select-html5-php").click(function(){return $("#public-methods-ms").multiSelect("select",["HTML5","PHP"]),!1}),$("#deselect-css-javascript").click(function(){return $("#public-methods-ms").multiSelect("deselect",["CSS","Javascript"]),!1}),$("#refresh").on("click",function(){return $("#public-methods-ms").multiSelect("refresh"),!1}),$("#add-option").on("click",function(){return $("#public-methods-ms").multiSelect("addOption",{value:"Pascal",text:"Pascal",index:0}),!1}),$("#optgroup-ms").multiSelect({selectableOptgroup:!0}),$("#disabled-attribute-ms").multiSelect(),$("#searchable-ms").multiSelect({selectableHeader:"<label>Non-selected</label><input type='text' class='search-input form-control mb-15' autocomplete='off' placeholder='try \"HTML\"'>",selectionHeader:"<label>Selected</label><input type='text' class='search-input form-control mb-15' autocomplete='off' placeholder='try \"CSS\"'>",afterInit:function(e){var t=this,l=t.$selectableUl.prev(),c=t.$selectionUl.prev(),s="#"+t.$container.attr("id")+" .ms-elem-selectable:not(.ms-selected)",i="#"+t.$container.attr("id")+" .ms-elem-selection.ms-selected";t.qs1=l.quicksearch(s).on("keydown",function(e){return 40===e.which?(t.$selectableUl.focus(),!1):void 0}),t.qs2=c.quicksearch(i).on("keydown",function(e){return 40==e.which?(t.$selectionUl.focus(),!1):void 0})},afterSelect:function(){this.qs1.cache(),this.qs2.cache()},afterDeselect:function(){this.qs1.cache(),this.qs2.cache()}})});