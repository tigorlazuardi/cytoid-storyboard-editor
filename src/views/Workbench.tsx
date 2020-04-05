import React, { Fragment, useState } from 'react'
import AppBar from '../components/surface/AppBar'
import Drawer from '../components/surface/Drawer'
import Config from '../config'
import Build from '@material-ui/icons/Build'
import drawerEntries from '../components/surface/drawer_entries'
import WorkArea from '../components/surface/WorkArea'

function Workbench() {
  const [open, setOpen] = useState(Config.env.HideBarOnScroll)
  return (
    <Fragment>
      <AppBar open={open} setOpen={setOpen} name='Workbench' />
      <Drawer
        open={open}
        entries={drawerEntries}
        header={{
          name: 'Toolbox',
          icon: <Build />,
        }}
        setOpen={setOpen}
      />
      <WorkArea open={open} />
    </Fragment>
  )
}

export default Workbench
