#pragma strict

public static var finishTarget : int = 14;
public        var finishFlag   : boolean = false;

public var track : track_t;

public var lap              : int   = 1;
public var pos              : int   = 1;
public var lastWaypoint     : int   = 1;

public var acceleration : float = 5;

public var minDrivingSpeed : float =-10;
public var maxDrivingSpeed : float = 40;

public var maxSteeringSpeed : float = 40;

public var inReverse : boolean = false;

public var distanceToNextWaypoint : float = 0;

public var id : int = 0;
