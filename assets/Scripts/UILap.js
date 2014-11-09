#pragma strict

public var uiText  : UI.Text;
public var vehicle : vehicleInfo_t;

function Start () {

}

function Update () {
	uiText.text = "Lap " + vehicle.lap.ToString();
}
