
this.ILDA.Utils={};
/*
this.ILDA.Frame=function() {};
this.ILDA.Frame.segments=[];

this.ILDA.Animation=function() {};
this.ILDA.Animation.frames=[];
this.ILDA.Animation.framerate=[];
*/
this.ILDA.Color=function(){};
this.ILDA.Color.r = 0;
this.ILDA.Color.g = 0;
this.ILDA.Color.b = 0;

this.ILDA.Point =function(){};
this.ILDA.Point.x = 0;
this.ILDA.Point.y = 0;
this.ILDA.Point.z = 0;
this.ILDA.Point.color = 0;
this.ILDA.Point.blanking = false;
this.ILDA.Point.last = false;

this.ILDA.File=function(){};
this.ILDA.File.sections = [];

this.ILDA.Section=function(){};
this.ILDA.Section.type = 0;
this.ILDA.Section.name = '';
this.ILDA.Section.company = '';
this.ILDA.Section.index = 0;
this.ILDA.Section.points = [];
this.ILDA.Section.head = 0;
this.ILDA.Section.total = 0;
this.ILDA.Section.colors = [];

this.ILDA.Reader=function(){};
this.ILDA.Reader.fromByteArray=function(){};

this.ILDA.Writer=function(){};
this.ILDA.Writer.toByteArray =function (){};
