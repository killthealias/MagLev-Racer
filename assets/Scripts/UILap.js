#pragma strict
public var Text : UI.Text;
function Start () {

}

function Update () {
	Text.text = "Lap " + vehicle_t.UILap;
}