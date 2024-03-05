'use client';
import React, { useState } from 'react';
import {
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from '@carbon/react';

const rankingsData = [
  { id: '1', team: 'Quantum Speedsters', wins: 14, losses: 6 },
  { id: '2', team: 'Neural Nitros', wins: 16, losses: 4 },
  { id: '3', team: 'Circuit Breakers', wins: 9, losses: 11 },
  { id: '4', team: 'Binary Burnouts', wins: 12, losses: 8 },
  { id: '5', team: 'Tensor Turbos', wins: 18, losses: 2 },
  { id: '6', team: 'Algorithmic Autos', wins: 7, losses: 13 },
  { id: '7', team: 'Silicon Shifters', wins: 11, losses: 9 },
  { id: '8', team: 'Electric Enigmas', wins: 15, losses: 5 },
]
  .map((team) => ({
    ...team,
    points: team.wins * 3, // 3 points per win
  }))
  .sort((a, b) => b.points - a.points || b.wins - a.wins); // Sort by points, then by wins

// Initial stats data
const initialStats = [
  {
    id: '1',
    team: 'Quantum Speedsters',
    racesWon: 24,
    fastestLap: '1:12',
    obstaclesAvoided: 320,
    titles: 5,
    yearsInLeague: 7,
    avgWinsPerSeason: 3.4,
  },
  {
    id: '2',
    team: 'Neural Nitros',
    racesWon: 18,
    fastestLap: '1:10',
    obstaclesAvoided: 305,
    titles: 4,
    yearsInLeague: 6,
    avgWinsPerSeason: 3.0,
  },
  {
    id: '3',
    team: 'Circuit Breakers',
    racesWon: 21,
    fastestLap: '1:08',
    obstaclesAvoided: 289,
    titles: 3,
    yearsInLeague: 5,
    avgWinsPerSeason: 4.2,
  },
  {
    id: '4',
    team: 'Binary Burnouts',
    racesWon: 15,
    fastestLap: '1:11',
    obstaclesAvoided: 267,
    titles: 2,
    yearsInLeague: 4,
    avgWinsPerSeason: 3.75,
  },
  {
    id: '5',
    team: 'Tensor Turbos',
    racesWon: 29,
    fastestLap: '1:07',
    obstaclesAvoided: 345,
    titles: 6,
    yearsInLeague: 8,
    avgWinsPerSeason: 3.625,
  },
  {
    id: '6',
    team: 'Algorithmic Autos',
    racesWon: 12,
    fastestLap: '1:14',
    obstaclesAvoided: 212,
    titles: 1,
    yearsInLeague: 3,
    avgWinsPerSeason: 4.0,
  },
  {
    id: '7',
    team: 'Silicon Shifters',
    racesWon: 16,
    fastestLap: '1:09',
    obstaclesAvoided: 298,
    titles: 3,
    yearsInLeague: 6,
    avgWinsPerSeason: 2.66,
  },
  {
    id: '8',
    team: 'Electric Enigmas',
    racesWon: 27,
    fastestLap: '1:06',
    obstaclesAvoided: 332,
    titles: 5,
    yearsInLeague: 7,
    avgWinsPerSeason: 3.85,
  },
];

const headers = [
  { key: 'team', header: 'Team' },
  { key: 'racesWon', header: 'Races Won' },
  { key: 'fastestLap', header: 'Fastest Lap' },
  { key: 'obstaclesAvoided', header: 'Obstacles Avoided' },
  { key: 'titles', header: 'Titles' },
  { key: 'yearsInLeague', header: 'Years in League' },
  { key: 'avgWinsPerSeason', header: 'Average Wins per Season' },
];

// Example team names
const teams = [
  'Quantum Speedsters',
  'Neural Nitros',
  'Circuit Breakers',
  'Binary Burnouts',
  'Tensor Turbos',
  'Algorithmic Autos',
  'Silicon Shifters',
  'Electric Enigmas',
];

// Function to randomly select two different teams for a match
const selectTwoDifferentTeams = () => {
  let team1Index = Math.floor(Math.random() * teams.length);
  let team2Index = Math.floor(Math.random() * teams.length);
  while (team1Index === team2Index) {
    team2Index = Math.floor(Math.random() * teams.length); // Re-select team2 until it's different from team1
  }
  return { team1: teams[team1Index], team2: teams[team2Index] };
};

// Generate a head-to-head schedule for the next week
const generateSchedule = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const schedule = days.map((day) => {
    const matches = [];
    for (let i = 0; i < 2; i++) {
      // Assuming 2 matches per day for simplicity
      const { team1, team2 } = selectTwoDifferentTeams();
      matches.push({
        time: i === 0 ? '10:00 AM' : '2:00 PM',
        teams: `${team1} vs ${team2}`,
      });
    }
    return { day, matches };
  });
  return schedule;
};

const schedule = generateSchedule();

export default function SpectatorPage() {
  const [stats, setStats] = useState(initialStats);
  return (
    <Tabs defaultSelectedIndex={0} aria-label="Spectator navigation">
      <TabList aria-label="Spectator tabs">
        <Tab>Schedule</Tab>
        <Tab>Stats</Tab>
        <Tab>Rankings</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <h2>Schedule</h2>
          {schedule.map((daySchedule) => (
            <TableContainer key={daySchedule.day} title={daySchedule.day}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeader>Time</TableHeader>
                    <TableHeader>Match</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {daySchedule.matches.map((match, index) => (
                    <TableRow key={index}>
                      <TableCell>{match.time}</TableCell>
                      <TableCell>{match.teams}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ))}
        </TabPanel>
        <TabPanel>
          <DataTable
            rows={stats}
            headers={headers}
            isSortable
            render={({ rows, headers, getHeaderProps, getTableProps }) => (
              <TableContainer title="AI Racing Stats">
                <Table {...getTableProps()}>
                  <TableHead>
                    <TableRow>
                      {headers.map((header) => (
                        <TableHeader {...getHeaderProps({ header })}>
                          {header.header}
                        </TableHeader>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.id}>
                        {row.cells.map((cell) => (
                          <TableCell key={cell.id}>{cell.value}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          />
        </TabPanel>
        <TabPanel>
          <h2>Rankings</h2>
          <DataTable
            rows={rankingsData}
            headers={[
              { key: 'team', header: 'Team' },
              { key: 'points', header: 'Total Points' },
              { key: 'wins', header: 'Total Wins' },
              { key: 'losses', header: 'Total Losses' },
            ]}
            render={({ rows, headers, getHeaderProps, getTableProps }) => (
              <TableContainer title="Team Rankings">
                <Table {...getTableProps()}>
                  <TableHead>
                    <TableRow>
                      {headers.map((header) => (
                        <TableHeader {...getHeaderProps({ header })}>
                          {header.header}
                        </TableHeader>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.id}>
                        {row.cells.map((cell) => (
                          <TableCell key={cell.id}>{cell.value}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
