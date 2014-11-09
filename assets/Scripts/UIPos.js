#pragma strict

public var uiText  : UI.Text;
public var vehicle : vehicleInfo_t;

function Start () {

}

function Update () {

	uiText.text = "Position " + vehicle.pos.ToString();
}
