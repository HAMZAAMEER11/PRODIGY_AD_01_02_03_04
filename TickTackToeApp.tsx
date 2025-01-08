import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const TicTacToeApp = () => {
  const [board, setBoard] = useState<string[][]>([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');

  const checkWinner = (board: string[][]): string | null => {
    // Check rows, columns, and diagonals for a winner
    for (let i = 0; i < 3; i++) {
      if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
        return board[i][0];
      }
      if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
        return board[0][i];
      }
    }
    if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      return board[0][0];
    }
    if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      return board[0][2];
    }
    return null;
  };

  const checkDraw = (board: string[][]): boolean => {
    return board.every(row => row.every(cell => cell));
  };

  const handlePress = (row: number, col: number) => {
    if (board[row][col]) return; // Cell already occupied

    const newBoard = board.map((r, rowIndex) =>
      r.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? currentPlayer : cell
      )
    );
    setBoard(newBoard);

    const winner = checkWinner(newBoard);
    if (winner) {
      Alert.alert('Game Over', `${winner} wins!`);
      resetGame();
      return;
    }

    if (checkDraw(newBoard)) {
        Alert.alert('Game Over', 'It\'s a draw!');
        setTimeout(resetGame, 500); // Resets the game after 500ms
        return;
      }
      

    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const resetGame = () => {
    setBoard([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);
    setCurrentPlayer('X');
  };

  const renderCell = (row: number, col: number) => (
    <TouchableOpacity
      style={styles.cell}
      onPress={() => handlePress(row, col)}
    >
      <Text style={styles.cellText}>{board[row][col]}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe</Text>
      <Text style={styles.subtitle}>Current Player: {currentPlayer}</Text>
      <View style={styles.board}>
        {board.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((_, colIndex) => renderCell(rowIndex, colIndex))}
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text style={styles.resetButtonText}>Reset Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  board: {
    borderWidth: 2,
    borderColor: '#000',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#fff',
  },
  cellText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  resetButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TicTacToeApp;
