import Artists from "../components/pages/Artists";
import Playlists from "../components/pages/Playlists"
import Songs from "../components/pages/Songs"
import ViewPlaylist from "../components/pages/ViewPlaylist";
import ViewUser from "../components/pages/ViewUser";
import Recent  from "../components/pages/Recent";
import Recommendations from "../components/pages/Recommendations";
import ViewSong from "../components/pages/ViewSong";

import { Navigate } from "react-router-dom";

export const Router = [{
    path: '/callback',
    element: <Navigate replace to='/' />
  },
  {
    path: '/artists',
    element: <Artists />
  },
  {
    path: '/songs',
    element: <Songs />
  },
  {
    path: '/recent',
    element: <Recent />
  },
  {
    path: '/playlists',
    element: <Playlists />
  },
  {
    path: '/artists/:id',
    element: <ViewUser />
  },
  {
    path: '/playlists/:id',
    element: <ViewPlaylist />
  },
  {
    path: '/recommendations/:id',
    element: <Recommendations />
  },
  {
    path: 'songs/:id',
    element: <ViewSong />
  }
]
