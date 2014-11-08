#pragma strict

static var velocity  : float = 0f;
static var aVelocity : float = 0f;

public var speedDif : float = 0.5;
public var steerDif : float = 0.5;

public var sparkPrefab : UnityEngine.Object;

public var cam : Camera;

function isInReverse(){
  var info : vehicleInfo_t = GetComponent(vehicleInfo_t);
  return info.inReverse;
}

function getMaxDrivingSpeed(){
  var info : vehicleInfo_t = GetComponent(vehicleInfo_t);
  return info.maxDrivingSpeed;
}

function getMass(){
  return rigidbody.mass;
}

function Start(){
}

function updateWaypointInfo(){
  var info  : vehicleInfo_t = GetComponent(vehicleInfo_t);
  var track : track_t       = info.track;

  var waypoints : int   = track.waypointCount;
  var distance  : float = 0;

  var nextWaypointID : int = ((info.lastWaypoint + 1) % waypoints);
  var nextWaypoint   : waypoint_t = (track.waypoints[nextWaypointID] as waypoint_t);

  for(var i = 0; i < waypoints; i++){
    var waypoint : waypoint_t = (track.waypoints[i] as waypoint_t);

    distance = waypoint.distanceTo(info);

    if(distance < 100) {
 	    info.lastWaypoint = i;

      nextWaypointID = ((info.lastWaypoint + 1) % waypoints);
      nextWaypoint   = (track.waypoints[nextWaypointID] as waypoint_t);

	    if(nextWaypointID == info.finishTarget){
  	    info.finishFlag = true;
	    }

      break;
  	}
  }

  info.distanceToNextWaypoint = nextWaypoint.distanceTo(info);
}

function updateMovement(){
  var info  : vehicleInfo_t = GetComponent(vehicleInfo_t);

	var speed : float = speedDif * Input.GetAxis("Speed");
	var steer : float = steerDif * Input.GetAxis("Steer");

	velocity  = rigidbody.velocity.magnitude;
	aVelocity = rigidbody.angularVelocity.y;

  info.inReverse = (rigidbody.velocity.z < 0);

	if (speed > 0) {
		rigidbody.AddRelativeForce(Vector3.down * info.maxDrivingSpeed * speed);
	}
	else {
		rigidbody.AddRelativeForce(0.2 * Vector3.down * info.maxDrivingSpeed * speed);
	}

	rigidbody.AddRelativeTorque(Vector3.back * info.maxSteeringSpeed * steer);
}

function updateCamera(){
  var newPos : Vector3;
  var center : int;

	if(aVelocity > 0.1){
		newPos = Vector3(2, 9, 4);
		center = 2;
	}
	else if(aVelocity < -0.1){
		newPos = Vector3(-2, 9, 4);
		center = 2;
	}
	else {
		newPos = Vector3(0, 9, 4);
		center = 1;
	}

	cam.transform.localPosition = Vector3.Lerp(cam.transform.localPosition,
                                             newPos,
                                             Time.deltaTime * center);

	if(0 < velocity){
		cam.fieldOfView = cam.fieldOfView + Time.deltaTime * 10;

    if(100 < cam.fieldOfView)
      cam.fieldOfView = 100;
  }
	else{
		cam.fieldOfView = cam.fieldOfView - Time.deltaTime * 5;

    if(cam.fieldOfView < 70)
      cam.fieldOfView = 70;
	}
}

function FixedUpdate(){
  var info : vehicleInfo_t = GetComponent(vehicleInfo_t);

  updateMovement();
  updateWaypointInfo();
  updateCamera();
}

/* function OnGUI () {
  var info : vehicleInfo_t = GetComponent(vehicleInfo_t);

	GUI.Label(Rect(10 ,10,400,200), "LAP " + info.lap);
	GUI.Label(Rect(400,10,400,200), info.pos.ToString());
}
*/
function OnCollisionStay (collidedObject : Collision) {
  if(0.1 < rigidbody.velocity.magnitude){
	  var contact = collidedObject.contacts[0];

	  var rot = Quaternion.FromToRotation(Vector3.up, contact.normal);
	  var pos = contact.point;

	  Instantiate(sparkPrefab, pos, rot);
  }
}
