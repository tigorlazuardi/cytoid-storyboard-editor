import React, { Fragment, useState } from 'react'
import AppBar from '../components/surface/AppBar'
import Drawer from '../components/surface/Drawer'
import Config from '../config'
import Build from '@material-ui/icons/Build'

function Workbench() {
  const [open, setOpen] = useState(Config.env.HideBarOnScroll)
  return (
    <Fragment>
      <AppBar open={open} setOpen={setOpen} name='Workbench' />
      <Drawer
        open={open}
        entries={[]}
        header={{
          name: 'Toolbox',
          icon: <Build />,
        }}
      />
    </Fragment>
  )
}

export default Workbench
