This is the list of nodes that need to be done.

A note on arrays: all nodes should accept arrays. They should state so when that's not the case.

In case of a node where the main input is an array of 5 items, the output will be an array of 5 items unless otherwise stated.

In case of a node with two or more array inputs where the number of items on all arrays is the same, the output will contain the same number of items.

In case of a node with two or more array inputs where the number of items on any input array is different, the output will contain the same number of items as the longest array. When doing operations, the input items will wrap (eg: [1,2,3] + [100,200] = [101,202,103]).


==========
MAIN QUEUE
----------


ANIMATION
---------


TRANSITION
Display: Transition
Inputs: Starting Value (float); Ending Value (float); Time (float, seconds); Paused (boolean, 1/0);
Outputs: Output Value (float); Current Phase (float, 0-1); Cycles completed (int)
Description: continuously does a transition from one value to another.
* Add Animation equation here?


NUMBER
------

ABS
Display: Abs
Inputs: input-0 (float)
Outputs: output-0 (float)
Description: same as Math.abs().

ADD [DONE]
Display: +
Inputs: input-0 (float); input-1 (float)
Outputs: output-0 (float)
Description: does a normal addition operation.

COS
Display: Cos
Inputs: input-0 (float)
Outputs: output-0 (float)
Description: Returns cosine of a number. Same as Math.cos(). Input is in radians.

DIVIDE
Display: /
Inputs: input-0 (float); input-1 (float)
Outputs: output-0 (float)
Description: does a normal division operation.

EQUAL
Display: =
Inputs: input-0 (float); input-1 (float)
Outputs: output-0 (int, 0-1)
Description: compares two numbers. Returns 1 if input-0 = input-1, 0 if otherwise.

GREATER OR EQUAL THAN
Display: >=
Inputs: input-0 (float); input-1 (float)
Outputs: output-0 (int, 0-1)
Description: compares two numbers. Returns 1 if input-0 >= input-1, 0 if otherwise.

GREATER THAN
Display: >
Inputs: input-0 (float); input-1 (float)
Outputs: output-0 (int, 0-1)
Description: compares two numbers. Returns 1 if input-0 > input-1, 0 if otherwise.

IO [ALMOST DONE]
Display: [value]
Inputs: input-0 (float)
Outputs: output-0 (float)
Description: Displays a number, serving as a variable checker. Also allows editing/input by double-clicking to edit.

IO CHECKBOX
Display: [checkbox]
Inputs: input-0 (float)
Outputs: output-0 (int, 0-1)
Description: Displays a checkbox, allowing clicking to edit. Has the value 1 if checked, 0 otherwise; in case of input, 1 or higher means 1; lower than 1 means 0.

IO SLIDER
Display: [slider]
Inputs: Input value (float), Minimum Value (float), Maximum Value (float), Slider Size (float), Step Size (float), Is Horizontal (int, 0-1)
Outputs: output-0 (float)
Description: A vertical/horizontal slider. Returns a value between the minimum and maximum, selected by the user. Otherwise, the input value.

LESS OR EQUAL THAN
Display: <=
Inputs: input-0 (float); input-1 (float)
Outputs: output-0 (int, 0-1)
Description: compares two numbers. Returns 1 if input-0 <= input-1, 0 if otherwise.

LESS THAN
Display: <
Inputs: input-0 (float); input-1 (float)
Outputs: output-0 (int, 0-1)
Description: compares two numbers. Returns 1 if input-0 < input-1, 0 if otherwise.

MAP
Display: Map
Inputs: input (float), input minimum (float), input maximum (float), output minimum (float), output maximum (float), clamp output (int, 0-1)
Outputs: output (float)
Description: Maps a value from one range to another. If clamp is on, clamps the range to the maximum and minimum first.

MOD
Display: Mod
Inputs: input-0 (float); input-1 (float)
Outputs: output-0 (float)
Description: Does a modulo operation between two numbers.

MOD RANGE
Display: ModRange
Inputs: input-0 (float); minimum (float); maximum (float)
Outputs: output-0 (float)
Description: Does a modulo operation between two numbers, but mapping between a minimum and a maximum instead.

MULTIPLY
Display: *
Inputs: input-0 (float); input-1 (float)
Outputs: output-0 (float)
Description: does a normal multiplication operation.

PI
Display: PI
Inputs: -
Outputs: output-0 (float)
Description: returns the PI constant.

SIN
Display: Sin
Inputs: input-0 (float)
Outputs: output-0 (float)
Description: Returns sine of a number. Same as Math.sin(). Input is in radians.

SUBTRACT
Display: -
Inputs: input-0 (float); input-1 (float)
Outputs: output-0 (float)
Description: does a normal subtraction operation.

TO DEGREES
Display: ToDegrees
Inputs: input (float)
Outputs: output (float)
Description: converts a value from radians to degrees.

TO RADIANS
Display: ToRadians
Inputs: input (float)
Outputs: output (float)
Description: converts a value from degrees to radians.

TO STRING
Display: ToString
Inputs: input (float); radix (int); min decimal places; max decimal places; min algarisms; max algarisms
Outputs: output (string)
Description: converts a value to String, using the selected radix.


STRING
------

CONCATENATE
Display: +
Inputs: input-0 (string); input-1 (string)
Outputs: output-0 (string)
Description: does a normal concatenation operation.

IO
Display: [value]
Inputs: input-0 (string)
Outputs: output-0 (string)
Description: Displays a string, serving as a variable checker. Also allows editing/input by double-clicking to edit.

MULTIPLY
Display: -
Inputs: input-0 (string); input-1 (int)
Outputs: output-0 (string)
Description: multiplies a string several times.


SYSTEM
------

KEYBOARD
Display: Keyboard
Inputs: -
Outputs: Current Key Code pressed (int), current char code pressed (int), current unicode key identifier (string?), current key location (int), ctrl key state (int, 0/1), shift key state (int, 0/1), alt key state (0/1), alt gr key state (0/1)
Description: Shows information about the keyboard (keys pressed)

STATISTICS
Display: Statistics
Inputs: -
Outputs: Global framerate (float), patch processing time per frame (float), global memory in use (int)
Description: Benchmarking and debugging statistics.

TIMING
Display: Timing
Inputs: -
Outputs: Running time (float, in s), current frame (int)
Description: Running time information, for animation purposes

VERSION
Display: Version
Inputs: -
Outputs: Version number (string), build number (int), build date (date), build time (time)
Description: Version information.


GENERAL/OTHER
-------------

SWITCH
Display: ?
Inputs: switch value (int); input-0 (any); input-1 (any)
Outputs: output-0 (any)
Description: does a switch, picking from different values depending on the value of the switch. The output has the same data type as the inputs.
* NEED TO: properly understand inputs being connected; properly change the outputs; allow number of inputs to be changed?



=======================
SUGGESTIONS/OTHER IDEAS
-----------------------

NUMBER
------

CLAMP?

[NAME]
Display:
Inputs:
Outputs:
Description:


FROM FNK.AS, need to format properly:

Sound: AbstractSynth; AudioOut; AudioSpectrum; SawtoothSynth; SineSynth; SoundFile; SquareSynth; TriangleSynth
Image: GetPixel; Image; ImageFile
Graphic: AbstractSprite; CircleSprite; Display; Filter; FromImage; Group; LineSprite; Opacity; PathSprite; RectangleSprite; SortDepth; TextSprite; Transform; Transform2D; VideoIn
Filter: Blur
Color: FromHSV; From RGB
Array: Concatenate; Length; LinearArray; RandomArray
