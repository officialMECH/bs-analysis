// Generouted, changes to this file will be overriden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
  | `/`
  | `/:key`
  | `/:key/data`
  | `/:key/level/:sid/:bid`

export type Params = {
  '/:key': { key: string }
  '/:key/data': { key: string }
  '/:key/level/:sid/:bid': { key: string; sid: string; bid: string }
}

export type ModalPath = never

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()
