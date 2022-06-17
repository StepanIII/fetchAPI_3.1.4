package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping()
    public String showUsers(Model model, Principal principal) {
        model.addAttribute("users", userService.getAllUsers());
        model.addAttribute("user", userService.getUserByName(principal.getName()));
        model.addAttribute("roles", roleService.getAllRoles());
        return "list-users-view";
    }

//    @GetMapping("/{id}/update")
//    public String updateUsersView(@PathVariable("id") int id, Model model) {
//        model.addAttribute("user", userService.getUserById(id));
//        model.addAttribute("roles", roleService.getAllRoles());
//        return "list-users-view";
//    }

//    @PatchMapping()
//    public String updateUser(@ModelAttribute("updateUser") User user) {
//        System.out.println(user);
//        userService.updateUser(user);
//        return "redirect:/admin";
//    }

//    @PatchMapping()
//    public String updateUser(@RequestBody User user) {
//        System.out.println(user);
//        userService.updateUser(user);
//        return "redirect:/admin";
//    }
//
//    @GetMapping("/add")
//    public String addUsersView(Model model) {
//        model.addAttribute("user", new User());
//        model.addAttribute("roles", roleService.getAllRoles());
//        return "save-users-view";
//    }
//
//    @PostMapping()
//    public String addUser(@ModelAttribute("user") User user) {
//        userService.saveUser(user);
//        return "redirect:/admin";
//    }
//
//    @DeleteMapping("/{id}")
//    public String deleteUser(@PathVariable("id") int id) {
//        userService.deleteUserById(id);
//        return "redirect:/admin";
//    }
//
}
