import React, { Component } from "react";
import ReactDom from "react-dom";
import "bootstrap/dist/css/bootstrap.css";

import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";

import TeamSheet from "../teamSheet";
import { format } from "../utils/timer";
import DataTable from "../table/dataTable";
import Timer from "../timer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Divider from "@material-ui/core/Divider";
import Badge from "@material-ui/core/Badge";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
const drawerWidth = 240;
const styles = (theme) => ({
  root: {
    display: "flex",
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 800px",
  },
  appBar: {},
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
});

class App extends Component {
  state = {
    error: null,
    isLoaded: false,
    teams: [],
    data: [],
    timerRef: React.createRef(),

    modalShow: false,
    openDrawer: true,
    drawerWidth: 240,
  };

  showEditEventModal = (show) => {
    this.setState({ modalShow: show });
  };

  updateTable = (da) => {
    let timestamp = format(
      this.state.timerRef.current.state.hours,
      this.state.timerRef.current.state.minutes,
      this.state.timerRef.current.state.seconds
    );

    da["timestamp"] = timestamp;
    this.setState((prevState) => ({
      data: [...prevState.data, da],
    }));
  };
  tableHeaders = [
    "Team",
    "Player",
    "Event",
    "Outcome",
    "Pitchzone",
    "Timestamp",
  ];

  teamSelect = (team) => {
    let oldTeams = this.state.teams.slice();
    oldTeams.push(team);
    this.setState({ teams: oldTeams });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <Typography variant="h6" color="inherit" noWrap>
              Match-tracker
            </Typography>
          </Toolbar>
        </AppBar>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Grid container spacing={3}>
            <Grid xs={12}>
              <Grid container justify="center" spacing={3}>
                <Grid key="team1" item>
                  <Paper>
                    <div>
                      <TeamSheet
                        teamSelect={this.teamSelect}
                        addData={this.updateTable}
                      />
                    </div>
                  </Paper>
                </Grid>
                <Grid key="timer" item>
                  <div>
                    <Timer ref={this.state.timerRef} />
                  </div>
                </Grid>
                <Grid key="team2" item>
                  <Paper>
                    <div>
                      <TeamSheet
                        teamSelect={this.teamSelect}
                        addData={this.updateTable}
                      />
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Paper>
                <DataTable headers={this.tableHeaders} rows={this.state.data} />
              </Paper>
            </Grid>
          </Grid>
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
