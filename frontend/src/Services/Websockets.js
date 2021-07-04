import { IP, NODE_RED_IP } from './IPconfig';

export const WS_URL_LOBBY = "wss://" + IP + "/ws/lobby_nmm/";
export const WS_URL_PVP = "wss://" + IP + "/ws/game_nmm/";
export const WS_URL_PVAI = "wss://" + IP + "/ws/gameAI_nmm/";
export const WS_URL_PUBLIC_CHAT = "wss://" + NODE_RED_IP + "/ws";