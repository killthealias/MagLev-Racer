#pragma strict

public var waypoints     : waypoint_t[];
public var waypointCount : int;

public var racers     : vehicleInfo_t[];
public var racerCount : int;

function Start(){
  waypointCount = waypoints.Length;
  racerCount    = racers.Length;

  for(var i : int = 0; i < racerCount; i++)
    racers[i].id = i;
}

function FixedUpdate(){
  System.Array.Sort(racers, racerPositionSorting);

  for(var i : int = 0; i < racerCount; i++){
    racers[i].pos = (1 + i);
    // Debug.Log("Player [" + racers[i].id + "] in position [" + (i + 1) + "]");
  }
}

function racerPositionSorting(a : vehicleInfo_t,
                              b : vehicleInfo_t) : int {
  if(a.lap != b.lap)
    return ((a.lap < b.lap) ? 1 : -1);

  if(a.lastWaypoint != b.lastWaypoint)
    return ((a.lastWaypoint < b.lastWaypoint) ? 1 : -1);

  if(a.distanceToNextWaypoint != b.distanceToNextWaypoint)
    return ((a.distanceToNextWaypoint > b.distanceToNextWaypoint) ? 1 : -1);

  return 0;
}

function getWaypointID(w : waypoint_t){
  for(var i :int = 0; i < waypointCount; i++){
    if(waypoints[i] == w)
      return i;
  }

  return -1;
}
