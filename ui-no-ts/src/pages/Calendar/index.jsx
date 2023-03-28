import { useCallback, useEffect, useState } from "react";
import FullCalendar, { fromatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import ScheduleExpenseModal from "../Modals/ScheduleExpense";
import { tokens } from "../../theme";
import { formatDate } from "@fullcalendar/core";
import useFetch from "../../hooks/use-fetch";

const SCHEDULE_URL = "http://localhost:8000/api/schedule";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentExpenses, setCurrentExpenses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const { isLoading, error, get, post } = useFetch();

  const dataFetchHandler = useCallback((data) => {
    //map to calendar structure
    let mappedData = data.map((item) => {
      return {
        id: item.id,
        title: item.description,
        amount: item.amount,
        start: item.date,
        end: item.date,
        allDay: true,
      };
    });

    setCurrentExpenses(mappedData);
  }, []);

  const dataPostHandler = useCallback((data) => {
    console.log(data);

    setCurrentExpenses((prev) => {
      return [
        ...prev,
        {
          id: data.id,
          title: data.description,
          amount: data.amount,
          start: data.date,
          end: data.date,
          allDay: true,
        },
      ];
    });

    console.log("current expenses", currentExpenses)

    // setCurrentExpenses((prev) => ({
    //   prev: prev.push({
    //     id: data.id,
    //     title: data.description,
    //     amount: data.amount,
    //     start: data.date,
    //     end: data.date,
    //     allDay: true,
    //   }),
    // }));
  });

  useEffect(() => {
    get({ url: SCHEDULE_URL }, dataFetchHandler);
  }, [get, dataFetchHandler]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmitExpense = (values) => {
    console.log(values);

    post(
      {
        url: SCHEDULE_URL,
        body: values,
        headers: { "Content-Type": "application/json" },
      },
      dataPostHandler
    );

    setShowModal(false);
  };

  const handleDateClick = (selected) => {
    setSelectedDate(selected.startStr);
    setShowModal(true);

    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    // if (title) {
    //   calendarApi.addEvent({
    //     id: 1,
    //     title,
    //     start: selected.startStr,
    //     end: selected.endStr,
    //     allDay: selected.allDay,
    //   });
    // }
  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event ${selected.event.title}?`
      )
    ) {
      selected.event.remove();
    }
  };

  return (
    <>
      {showModal && (
        <ScheduleExpenseModal
          date={selectedDate}
          submitExpense={handleSubmitExpense}
          closeModal={handleCloseModal}
        />
      )}
      {currentExpenses && !isLoading && (
        <Box m="20px">
          <Header
            title="Expenses Calendar"
            subtitle="Keep track of coming expenses"
          ></Header>
          <Box display="flex" justifyContent="space-between">
            {/* CALENDAR SIDEBAR */}
            <Box
              flex="1 1 20%"
              backgroundColor={colors.primary[400]}
              p="15px"
              borderRadius="4px"
            >
              <Typography variant="h5">Incoming Expenses</Typography>
              <List>
                {currentExpenses.map((expense) => (
                  <ListItem
                    key={expense.id}
                    sx={{
                      backgroundColor: colors.greenAccent[500],
                      margin: "10px 0",
                      borderRadius: "2px",
                    }}
                  >
                    <ListItemText
                      primary={expense.title + "-" + expense.amount + "€"}
                      secondary={
                        <Typography>
                          {formatDate(expense.start, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* CALENDAR */}
            <Box flex="1 1 100%" ml="15px">
              <FullCalendar
                height="75vh"
                plugins={[
                  dayGridPlugin,
                  timeGridPlugin,
                  interactionPlugin,
                  listPlugin,
                ]}
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                }}
                initialView="dayGridMonth"
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                select={handleDateClick}
                eventClick={handleEventClick}
                initialEvents={currentExpenses}
              />
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Calendar;
