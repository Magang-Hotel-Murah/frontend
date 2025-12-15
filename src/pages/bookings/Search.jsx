import React, {useEffect } from 'react';
import { useSearchRooms } from '@hooks/meeting-room/useSearchRooms';
import { useGetRooms } from "@hooks/meeting-room";
import SearchRoomForm from '@components/common/SearchRoomForm';

const SearchRoom = ({ state, setState, onBookRoom }) => {
  const { searchRooms, isSearching, error, setError } = useSearchRooms();
  const { searchParams, searchResults, message } = state;

  const { data: room = [] } = useGetRooms();  
  const availableFacilities = Array.from(new Set(room.flatMap(r => r.facilities || [])));

  useEffect(() => {
    const bookingData = localStorage.getItem('bookingData');
    if (!bookingData) return;

    const data = JSON.parse(bookingData);

    setState(prev => ({
      ...prev,
      searchParams: {
        ...prev.searchParams,
        date: data.date || '',
        startTime: data.start_time || '',
        endTime: data.end_time || '',
        participants_count: data.participants_count || ''
      }
    }));
  }, [setState]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setState(prev => ({
      ...prev,
      searchParams: {
        ...prev.searchParams,
        [name]: value
      }
    }));
  };

  const toggleFacility = (facility) => {
    setState(prev => ({
      ...prev,
      searchParams: {
        ...prev.searchParams,
        facilities: prev.searchParams.facilities.includes(facility)
          ? prev.searchParams.facilities.filter(f => f !== facility)
          : [...prev.searchParams.facilities, facility]
      }
    }));
  };

  const handleSearch = async () => {
    setState(prev => ({ ...prev, message: '' }));
    setError(null);

    const result = await searchRooms(searchParams);

    if (result.success) {
      setState(prev => ({
        ...prev,
        searchResults: result.data,
        message: result.message
      }));
    } else {
      setState(prev => ({
        ...prev,
        searchResults: []
      }));
    }
  };

  const handleReset = () => {
    setState({
      searchParams: {
        date: '',
        startTime: '',
        endTime: '',
        participants_count: '',
        facilities: []
      },
      searchResults: [],
      message: ''
    });

    setError(null);
  };

  const formatTime = (time) => {
    if (!time) return '';
    const parts = time.split(':');
    const hours = parts[0].padStart(2, '0');
    const minutes = parts[1] ? parts[1].padStart(2, '0') : '00';
    return `${hours}:${minutes}`;
  };

  const handleBookRoom = (roomId) => {
    const selectedRoom = searchResults.find(
      room => room.id === roomId || room.room_id === roomId
    );

    const bookingData = {
      meeting_room_id: roomId,
      date: searchParams.date,
      start_time: formatTime(searchParams.start_time),
      end_time: formatTime(searchParams.end_time),
      participants_count: searchParams.participants_count,
      time_slot:
        selectedRoom?.free_slots?.length > 0
          ? `${selectedRoom.free_slots[0].start_time} - ${selectedRoom.free_slots[0].end_time}`
          : ""
    };

    localStorage.setItem('bookingData', JSON.stringify(bookingData));

    if (onBookRoom) {
      onBookRoom();
    }
  };

  const isSearchDisabled = !searchParams.date || !searchParams.participants_count;

  return (
    <SearchRoomForm
      searchParams={searchParams}
      searchResults={searchResults}
      isSearching={isSearching}
      error={error}
      message={message}
      availableFacilities={availableFacilities}
      handleInputChange={handleInputChange}
      toggleFacility={toggleFacility}
      handleSearch={handleSearch}
      handleReset={handleReset}
      handleBookRoom={handleBookRoom}
      isSearchDisabled={isSearchDisabled}
    />
  );
};

export default SearchRoom;