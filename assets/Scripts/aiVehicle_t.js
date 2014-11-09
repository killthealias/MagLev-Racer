#pragma strict

function Start(){
  var info : vehicleInfo_t = GetComponent(vehicleInfo_t);

  GetComponent(NavMeshAgent).speed = info.maxDrivingSpeed;
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

      GetComponent(NavMeshAgent).SetDestination(nextWaypoint.transform.position);

	    if(nextWaypointID == info.finishTarget){
  		  info.finishFlag = true;
		  }

      break;
  	}
  }

  info.distanceToNextWaypoint = nextWaypoint.distanceTo(info);
}

function FixedUpdate(){
  updateWaypointInfo();
}

function OnTriggerEnter(collidedObject : Collider){
  var info : vehicleInfo_t = gameObject.GetComponent(vehicleInfo_t);
  var way  : waypoint_t    = collidedObject.gameObject.GetComponent(waypoint_t);

  if((way.id == 0) && (info.finishFlag == true)){
    info.lap++;
    info.finishFlag = false;
  }
}
