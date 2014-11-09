#pragma strict

public var track : track_t;
public var id    : int;

function Start(){
  id = track.getWaypointID(this);
}

function distanceTo(v : vehicleInfo_t){
  return Vector3.Distance(v.gameObject.transform.position,
                          transform.position);
}
