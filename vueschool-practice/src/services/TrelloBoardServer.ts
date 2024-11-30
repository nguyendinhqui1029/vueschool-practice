import { Board } from './../models/TrelloBoardModel';
export async function getBoardData() {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/boards`,{
          headers: {
            'Accept': 'application/json'  // Chắc chắn rằng bạn yêu cầu dữ liệu dưới dạng JSON
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return await response.json();
      } catch (err) {
        console.log(err)
      }
}

export async function addColumData(board: Board) {
  try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/boards`,{
        method: 'POST',
        headers: {
          'Accept': 'application/json'  // Chắc chắn rằng bạn yêu cầu dữ liệu dưới dạng JSON
        },
        body: JSON.stringify(board)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (err) {
      console.log(err)
    }
}

export async function updateColumn(board: Board) {
  try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/boards/${board.id}`,{
       method: 'PATCH',
      headers: {
          'Accept': 'application/json'  // Chắc chắn rằng bạn yêu cầu dữ liệu dưới dạng JSON
        },
        body: JSON.stringify(board)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (err) {
      console.log(err)
    }
}

export async function removeColumn(id: string) {
  try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/boards/${id}`,{
       method: 'DELETE',
      headers: {
          'Accept': 'application/json'  // Chắc chắn rằng bạn yêu cầu dữ liệu dưới dạng JSON
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (err) {
      console.log(err)
    }
}