/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Task as TaskType,
  useGetTasksQuery,
  useUpdateTaskStatusMutation,
} from "@/src/state/api/api";
import {
  EllipsisVertical,
  EllipsisVerticalIcon,
  MessageSquareMore,
  Plus,
} from "lucide-react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { format } from "date-fns";
import Image from "next/image";

type BoardProps = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};
const taskStatus = ["To Do", "Work In Progress", "Under Review", "Completed"];
const BoardView = ({ id, setIsModalNewTaskOpen }: BoardProps) => {
  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksQuery({ projectId: Number(id) });
  const [updateTaskStatus] = useUpdateTaskStatusMutation();
  const moveTask = (taskId: number, toStatus: string) => {
    updateTaskStatus({ taskId, status: toStatus });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error while fetching tasks</div>;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-4">
        {taskStatus?.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasks}
            moveTask={moveTask}
            setisModalNewTaskOpen={setIsModalNewTaskOpen}
          />
        ))}
      </div>
    </DndProvider>
  );
};

interface TaskColumnProps {
  status: string;
  tasks: TaskType[];
  moveTask: (taskId: number, toStatus: string) => void;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
}

const TaskColumn = ({
  status,
  tasks,
  moveTask,
  setisModalNewTaskOpen,
}: TaskColumnProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: { id: number }) => moveTask(item.id, status),
    collect: (monitor: any) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  const taskCount = tasks.filter((task) => task.status === status).length;
  const statusColor: any = {
    "To Do": "#2563EB",
    "Work In Progress": "#059669",
    "Under Review": "#D97706",
    Completed: "#000000",
  };

  return (
    <div
      ref={(instence) => {
        drop(instence);
      }}
      className={`sl:py-4 rounded-lg py-2 xl:px-2 ${isOver ? "dark:bg-nutral-950 bg-blue-100" : ""}`}
    >
      <div className="mb-3 flex w-full">
        <div
          className={`w-2 !bg-[${statusColor[status]}] rounded-s-lg`}
          style={{
            backgroundColor: statusColor[status],
          }}
        />
        <div className="jstify-between flex w-full items-center rounded-e-lg bg-white px-5 py-4 dark:bg-dark-secondary">
          <h3 className="flex items-center text-lg font-semibold dark:text-white">
            {status}{" "}
            <span
              className="ml-2 inline-block rounded-full bg-gray-200 p-1 text-center text-sm leading-none dark:bg-dark-tertiary"
              style={{
                width: "1.5rem",
                height: "1.5rem",
              }}
            >
              {taskCount}
            </span>
          </h3>
          <div className="flex items-center gap-1">
            <button className="dark:text-nutar50 flex h-6 w-5 items-center justify-center dark:text-neutral-500">
              <EllipsisVertical size={26} />
            </button>
            <button
              className="flex h-6 w-6 items-center justify-center rounded bg-gray-200 dark:bg-dark-tertiary dark:text-white"
              onClick={() => setisModalNewTaskOpen(true)}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
      {tasks
        ?.filter((task) => task.status === status)
        .map((task) => <Task key={task?.id} task={task} />)}
    </div>
  );
};

type TaskProps = {
  task: TaskType;
};

const Task = ({ task }: TaskProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const taskTagsSplit = task.tags ? task.tags.split(",") : [];
  const formattedStartDate = task.startDate
    ? format(new Date(task.startDate), "P")
    : "";
  const formattedDueDate = task.dueDate
    ? format(new Date(task.dueDate), "P")
    : "";
  const numberOfComments = (task.comments && task?.comments?.length) || 0;

  const PriorityTag = ({ priority }: { priority: TaskType["priority"] }) => (
    <div
      className={`rounded-full px-2 py-1 text-xs font-semibold ${
        priority === "Urgent"
          ? "bg-red-200 text-red-700"
          : priority === "High"
            ? "bg-yellow-200 text-yellow-700"
            : priority === "Medium"
              ? "bg-green-200 text-green-700"
              : priority === "Low"
                ? "bg-blue-200 text-blue-700"
                : "bg-gray-200 text-gray-700"
      }`}
    >
      {priority}
    </div>
  );
  return (
    <div
      ref={(instance) => {
        drag(instance);
      }}
      className={`mb-4 rounded-md bg-white shadow dark:bg-dark-secondary ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {task.attachments && task.attachments.length > 0 && (
        <Image
          alt={task?.attachments[0].fileName}
          src={`/${task.attachments[0].fileURL}`}
          width={400}
          height={200}
          className="h-auto w-full rounded-t-md"
        />
      )}
      <div className="p-4 md:p-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-2">
            {task?.priority && <PriorityTag priority={task?.priority} />}
            <div className="flex gap-2">
              {taskTagsSplit.map((tag) => (
                <div
                  key={tag}
                  className="bg-blue100 text tex-xs rounded-full px-2 py-1"
                >
                  {" "}
                  {tag}
                </div>
              ))}
            </div>
          </div>
          <button className="flex h-6 w-4 flex-shrink-0 items-center justify-center dark:text-neutral-500">
            <EllipsisVerticalIcon size={26} />
          </button>
        </div>
        <div className="my-3 flex justify-between">
          <h4 className="text-base font-bold dark:text-white">{task?.title}</h4>
          {typeof task.points === "number" && (
            <div className="text-xs font-semibold dark:text-white">
              {task?.points}
            </div>
          )}
        </div>
        <div className="text-xs text-gray-500 dark:text-neutral-500">
          {formattedStartDate && <span> {formattedStartDate} - </span>}
          {formattedDueDate && <span> {formattedDueDate}</span>}
        </div>
        <p className="text-xs text-gray-600 dark:text-neutral-500">
          {task?.description}
        </p>
        <div className="mt-4 border-t border-gray-200 dark:border-stroke-dark">
          {/* Users  */}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex -space-x-[6px] overflow-hidden">
              {task?.assigne && (
                <Image
                  key={task.assigne.userid}
                  src={`/${task.assigne.profilePictureUrl}`}
                  width={30}
                  height={30}
                  className="h-8 w-8 rounded-full border-2 border-white object-cover dark:border-dark-secondary"
                  alt={task.assigne?.username}
                />
              )}
              {task?.author && (
                <Image
                  key={task.author.userid}
                  src={`/${task.author.profilePictureUrl}`}
                  width={30}
                  height={30}
                  className="h-8 w-8 rounded-full border-2 border-white object-cover dark:border-dark-secondary"
                  alt={task.author?.username}
                />
              )}
            </div>
            <div className="flex items-center text-gray-500 dark:text-neutral-500">
              <MessageSquareMore size={20} />
              <span className="ml-1 text-sm dark:text-neutral-400">
                {numberOfComments}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardView;
