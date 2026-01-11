# ⚡ iOS Simulator Expert

Build, test, and automate iOS applications using accessibility-driven navigation and structured data instead of pixel coordinates.

## 🚀 Quick Start (In Antigravity)

```bash
# 1. Check environment
bash .agent/skills/ios-simulator/scripts/sim_health_check.sh

# 2. Launch app
python .agent/skills/ios-simulator/scripts/app_launcher.py --launch com.example.app

# 3. Map screen to see elements
python .agent/skills/ios-simulator/scripts/screen_mapper.py

# 4. Tap button
python .agent/skills/ios-simulator/scripts/navigator.py --find-text "Login" --tap
```

## 🛠️ Production Scripts (Bone)

The expert utilizes 21 specialized scripts located in `scripts/`:

### 🏗️ Build & Development
- `build_and_test.py`: Build Xcode projects and parse results.
- `log_monitor.py`: Real-time filtered log monitoring.

### 🧭 Navigation & Interaction
- `screen_mapper.py`: Semantic screen analysis.
- `navigator.py`: Find and interact with elements by text/ID/type.
- `gesture.py`: Complex touch gestures (swipe, pinch, scroll).
- `keyboard.py`: Hardware button and text input control.
- `app_launcher.py`: Lifecycle & Deep link management.

### 🧪 Testing & Analysis
- `accessibility_audit.py`: WCAG compliance check.
- `visual_diff.py`: Screenshot comparison.
- `test_recorder.py`: Automated markdown report generation.
- `app_state_capture.py`: Debugging snapshots.
- `sim_health_check.sh`: Environment verification.

### 🔐 Advanced Tools
- `clipboard.py`, `status_bar.py`, `push_notification.py`, `privacy_manager.py`.

### 📱 Device Management (simctl)
- `simctl_boot.py`, `simctl_shutdown.py`, `simctl_create.py`, `simctl_delete.py`, `simctl_erase.py`.

## 🏛️ Best Practices

- **Semantic Navigation**: Always prefer finding elements by text or ID over coordinates.
- **Environment Awareness**: Run `sim_health_check.sh` before starting long automation sessions.
- **Perfect Execution**: Use `--json` flags for automated data parsing within the Antigravity container.

---
*The Agent: Perfecting mobile automation with precision.*
