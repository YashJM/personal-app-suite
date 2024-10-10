import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Grid,
  Paper,
  Button,
  useTheme,
} from '@mui/material';
import {
  AddCircleOutline,
  RemoveCircleOutline,
  DragHandle,
} from '@mui/icons-material';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Define types
interface IExercise {
  id: string;
  name: string;
  sets: Array<{ reps: number; weight: number }>;
}

interface IDayWorkout {
  id: string;
  day: string;
  exercises: IExercise[];
}

// Initial data
const initialWorkouts: IDayWorkout[] = [
  {
    id: 'monday',
    day: 'Monday Day #1 (Chest and Back)',
    exercises: [
      {
        id: 'bench-press',
        name: 'Bench press',
        sets: [
          { reps: 20, weight: 12 },
          { reps: 25, weight: 10 },
          { reps: 30, weight: 8 },
          { reps: 35, weight: 6 },
          { reps: 40, weight: 4 },
        ],
      },
      // Add more exercises here
    ],
  },
  {
    id: 'tuesday',
    day: 'Tuesday Day #2 (Shoulders and Arms)',
    exercises: [
      {
        id: 'shoulders-barbell',
        name: 'Shoulders barbell',
        sets: [
          { reps: 0, weight: 12 },
          { reps: 2.5, weight: 10 },
          { reps: 2.5, weight: 8 },
        ],
      },
      // Add more exercises here
    ],
  },
  // Add other days similarly
];

// Sortable Exercise Component
const SortableExercise = ({
  exercise,
  dayIndex,
  exerciseIndex,
  handleAddSet,
  handleSetChange,
  handleRemoveSet,
}: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: exercise.id,
    });

  const theme = useTheme();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: '16px',
    padding: '16px',
    backgroundColor: theme.palette.background.paper, // Dark mode background
    color: theme.palette.text.primary, // Dark mode text color
    borderRadius: '4px',
    boxShadow: `0px 2px 4px ${theme.palette.divider}`, // Optional: add shadow if needed
  };

  return (
    <Box ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <DragHandle
          sx={{ marginRight: 1, color: theme.palette.text.primary }}
        />
        <Typography variant='subtitle1'>{exercise.name}</Typography>
      </Box>
      {exercise.sets.map((set: any, setIndex: number) => (
        <Grid container spacing={1} key={setIndex} sx={{ marginBottom: 1 }}>
          <Grid item xs={5}>
            <TextField
              label='Reps'
              type='number'
              value={set.reps}
              onChange={(e) =>
                handleSetChange(
                  dayIndex,
                  exerciseIndex,
                  setIndex,
                  'reps',
                  Number(e.target.value)
                )
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              label='Weight'
              type='number'
              value={set.weight}
              onChange={(e) =>
                handleSetChange(
                  dayIndex,
                  exerciseIndex,
                  setIndex,
                  'weight',
                  Number(e.target.value)
                )
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <IconButton
              onClick={() => handleRemoveSet(dayIndex, exerciseIndex, setIndex)}
              color='error'>
              <RemoveCircleOutline />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      <Button
        variant='outlined'
        startIcon={<AddCircleOutline />}
        onClick={() => handleAddSet(dayIndex, exerciseIndex)}>
        Add Set
      </Button>
    </Box>
  );
};

// Main Workout Component
const Workout = () => {
  const [workouts, setWorkouts] = useState<IDayWorkout[]>(initialWorkouts);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const handleDragEnd = (event: any, dayIndex: number) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = workouts[dayIndex].exercises.findIndex(
        (item) => item.id === active.id
      );
      const newIndex = workouts[dayIndex].exercises.findIndex(
        (item) => item.id === over.id
      );

      const newExercises = arrayMove(
        workouts[dayIndex].exercises,
        oldIndex,
        newIndex
      );
      const newWorkouts = [...workouts];
      newWorkouts[dayIndex].exercises = newExercises;
      setWorkouts(newWorkouts);
    }
  };

  const handleAddSet = (dayIndex: number, exerciseIndex: number) => {
    const newWorkouts = [...workouts];
    newWorkouts[dayIndex].exercises[exerciseIndex].sets.push({
      reps: 0,
      weight: 0,
    });
    setWorkouts(newWorkouts);
  };

  const handleRemoveSet = (
    dayIndex: number,
    exerciseIndex: number,
    setIndex: number
  ) => {
    const newWorkouts = [...workouts];
    newWorkouts[dayIndex].exercises[exerciseIndex].sets.splice(setIndex, 1);
    setWorkouts(newWorkouts);
  };

  const handleSetChange = (
    dayIndex: number,
    exerciseIndex: number,
    setIndex: number,
    field: 'reps' | 'weight',
    value: number
  ) => {
    const newWorkouts = [...workouts];
    newWorkouts[dayIndex].exercises[exerciseIndex].sets[setIndex][field] =
      value;
    setWorkouts(newWorkouts);
  };

  const handleAddExercise = (dayIndex: number) => {
    const newWorkouts = [...workouts];
    newWorkouts[dayIndex].exercises.push({
      id: `new-exercise-${Date.now()}`,
      name: 'New Exercise',
      sets: [{ reps: 0, weight: 0 }],
    });
    setWorkouts(newWorkouts);
  };

  const handleDayTitleChange = (dayIndex: number, newTitle: string) => {
    const newWorkouts = [...workouts];
    newWorkouts[dayIndex].day = newTitle;
    setWorkouts(newWorkouts);
  };

  const handleExerciseNameChange = (
    dayIndex: number,
    exerciseIndex: number,
    newName: string
  ) => {
    const newWorkouts = [...workouts];
    newWorkouts[dayIndex].exercises[exerciseIndex].name = newName;
    setWorkouts(newWorkouts);
  };

  return (
    <Box sx={{ padding: 2 }}>
      {workouts.map((workout, dayIndex) => (
        <Paper key={dayIndex} sx={{ marginBottom: 2, padding: 2 }}>
          <TextField
            label='Day Title'
            value={workout.day}
            onChange={(e) => handleDayTitleChange(dayIndex, e.target.value)}
            fullWidth
            variant='outlined'
            sx={{ marginBottom: 2 }}
          />
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={(event) => handleDragEnd(event, dayIndex)}>
            <SortableContext
              items={workout.exercises.map((exercise) => exercise.id)}
              strategy={verticalListSortingStrategy}>
              {workout.exercises.map((exercise, exerciseIndex) => (
                <SortableExercise
                  key={exercise.id}
                  exercise={exercise}
                  dayIndex={dayIndex}
                  exerciseIndex={exerciseIndex}
                  handleAddSet={handleAddSet}
                  handleSetChange={handleSetChange}
                  handleRemoveSet={handleRemoveSet}
                />
              ))}
            </SortableContext>
          </DndContext>
          <Button
            variant='contained'
            startIcon={<AddCircleOutline />}
            onClick={() => handleAddExercise(dayIndex)}
            sx={{ marginTop: 2 }}>
            Add Exercise
          </Button>
        </Paper>
      ))}
    </Box>
  );
};

export default Workout;
