#pragma strict
public var Text : UI.Text;
function Start () {

}

function Update () {
	Text.text = "Position " + vehicle_t.UIPos;
}