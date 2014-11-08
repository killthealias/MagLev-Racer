#pragma strict

var vehicle : vehicle_t;

function Update () {
  var nVelocity : float = (vehicle.velocity / (9.81 * vehicle.getMass()));
 // Debug.Log("nVelocity = " + nVelocity);

  if(!vehicle.isInReverse()){
	light.color = Color(0/255.0, 143.0/255.0, 255.0/255.0, 255.0/255.0);
//   light.intensity = (nVelocity * nVelocity);
	light.intensity = (nVelocity * nVelocity) * 0.15;
  }
  else{
//    light.color = Color(218.0/255.0, 63.0/255.0, 63.0/255.0, 255.0/255.0);
	light.color = Color(0/255.0, 143.0/255.0, 255.0/255.0, 255.0/255.0);
    light.intensity = (nVelocity * nVelocity) * 0.15;
  }
}
