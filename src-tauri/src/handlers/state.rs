use serde::{Serialize, Deserialize};
use probe_rs::DebugProbeInfo;
use crc::{crc16};

#[derive(Serialize, Deserialize, Clone, Debug)]
#[serde(tag = "state")]
pub enum ProbeState {
    Waiting,
    Erasing,
    Flashing,
    Success,
    Error,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct ProbeInfo {
    probe_sn: String,
    short_id: String,
    state: ProbeState,
    target_id: Option<String>,
    probe_name: String,
}

impl ProbeInfo {
    pub fn new_from_dbg_probe(probe: DebugProbeInfo) -> ProbeInfo {
        let short_id =  if probe.serial_number.is_some() {
            crc16::checksum_x25(probe.serial_number.clone().unwrap().as_bytes())
        } else {
            0
        };

        let probe_name = match probe.probe_type {
            probe_rs::DebugProbeType::CmsisDap => { "DAPLink" }
            probe_rs::DebugProbeType::Ftdi => { "FTDI" }
            probe_rs::DebugProbeType::StLink => { "STLink" }
            probe_rs::DebugProbeType::JLink => { "JLink" }
        };

        let probe_sn = if probe.serial_number.is_some() {
            probe.serial_number.unwrap().clone()
        } else {
            "".to_string()
        };

        ProbeInfo { probe_sn, short_id: format!("{:x}", short_id), state: ProbeState::Waiting, target_id: None, probe_name: probe_name.to_string() }
    }
} 